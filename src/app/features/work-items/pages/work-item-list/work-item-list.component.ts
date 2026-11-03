import { ChangeDetectionStrategy, Component, computed, effect, signal, untracked, } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { BadgeVariant, StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { PriorityFilter, PriorityFilterComponent } from '../../../../shared/components/priority-filter/priority-filter.component';
import { WorkItem, WorkItemStatus } from '../../models/work-item.model';

// interface WorkItem {
//   id: number;
//   title: string;
//   assignedTo: string;
//   priority: 'Low' | 'Medium' | 'High';
//   status: 'Pending' | 'In Progress' | 'Completed';
// }

type StatusFilter = 'All' | WorkItemStatus;


@Component({
  selector: 'app-work-item-list',
  standalone: true,
  imports: [PageHeaderComponent,StatusBadgeComponent,ConfirmDialogComponent,PriorityFilterComponent],
  templateUrl: './work-item-list.component.html',
  styleUrl: './work-item-list.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WorkItemListComponent {
//  readonly workItems=  signal<WorkItem[]> ( [
//     {
//       id: 101,
//       title: 'Review onboarding documents',
//       assignedTo: 'Alex Johnson',
//       priority: 'Medium',
//       status: 'Pending'
//     },
//     {
//       id: 102,
//       title: 'Update employee records',
//       assignedTo: 'Sarah Wilson',
//       priority: 'High',
//       status: 'In Progress'
//     },
//     {
//       id: 103,
//       title: 'Prepare weekly report',
//       assignedTo: 'Michael Brown',
//       priority: 'Low',
//       status: 'Completed'
//     }
//   ]);


//    readonly selectedPriority = signal<PriorityFilter>('All');
//   readonly pendingDeleteId = signal<number | null>(null);

//   private nextId = 104;

//   readonly filteredWorkItems = computed(() => {
//     const priority = this.selectedPriority();
//     const items = this.workItems();

//     if (priority === 'All') {
//       return items;
//     }

//     return items.filter(item => item.priority === priority);
//   });

//   readonly totalItems = computed(() => this.workItems().length);

//   getStatusVariant(status: WorkItemStatus): BadgeVariant {
//     switch (status) {
//       case 'Completed':
//         return 'success';

//       case 'In Progress':
//         return 'primary';

//       case 'Pending':
//         return 'warning';
//     }
//   }

//   addSampleTask(): void {
//     const newItem: WorkItem = {
//       id: this.nextId++,
//       title: 'New sample task',
//       assignedTo: 'Demo User',
//       priority: 'Medium',
//       status: 'Pending'
//     };

//     this.workItems.update(items => [...items, newItem]);
//   }

//   requestDelete(id: number): void {
//     this.pendingDeleteId.set(id);
//   }

//   cancelDelete(): void {
//     this.pendingDeleteId.set(null);
//   }

//   deleteSelected(): void {
//     const id = this.pendingDeleteId();

//     if (id === null) {
//       return;
//     }

//     this.workItems.update(items =>
//       items.filter(item => item.id !== id)
//     );

//     this.pendingDeleteId.set(null);
//   }


private readonly preferenceKey = 'twp-work-item-preferences';

  readonly workItems = signal<WorkItem[]>([
    {
      id: 101,
      title: 'Review onboarding documents',
      assignedTo: 'Alex Johnson',
      priority: 'Medium',
      status: 'Pending'
    },
    {
      id: 102,
      title: 'Update employee records',
      assignedTo: 'Sarah Wilson',
      priority: 'High',
      status: 'In Progress'
    },
    {
      id: 103,
      title: 'Prepare weekly report',
      assignedTo: 'Michael Brown',
      priority: 'Low',
      status: 'Completed'
    }
  ]);

  readonly searchTerm = signal('');
  readonly selectedPriority = signal<PriorityFilter>('All');
  readonly selectedStatus = signal<StatusFilter>('All');
  readonly compactView = signal(false);
  readonly pendingDeleteId = signal<number | null>(null);

  readonly statusOptions: StatusFilter[] = [
    'All',
    'Pending',
    'In Progress',
    'Completed'
  ];

  private nextId = 104;

  readonly totalItems = computed(() => this.workItems().length);

  readonly completedItems = computed(() =>
    this.workItems().filter(item => item.status === 'Completed').length
  );

  readonly activeItems = computed(() =>
    this.workItems().filter(item => item.status === 'In Progress').length
  );

  readonly pendingItems = computed(() =>
    this.workItems().filter(item => item.status === 'Pending').length
  );

  readonly completionPercentage = computed(() => {
    const total = this.totalItems();

    if (total === 0) {
      return 0;
    }

    return Math.round((this.completedItems() / total) * 100);
  });

  readonly filteredWorkItems = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const priority = this.selectedPriority();
    const status = this.selectedStatus();

    return this.workItems().filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(search) ||
        item.assignedTo.toLowerCase().includes(search);

      const matchesPriority =
        priority === 'All' || item.priority === priority;

      const matchesStatus =
        status === 'All' || item.status === status;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  });

  readonly hasActiveFilters = computed(() =>
    this.searchTerm().trim() !== '' ||
    this.selectedPriority() !== 'All' ||
    this.selectedStatus() !== 'All'
  );

  constructor() {
    this.restorePreferences();

    effect(() => {
      const preferences = {
        priority: this.selectedPriority(),
        compactView: this.compactView()
      };

      try {
        localStorage.setItem(
          this.preferenceKey,
          JSON.stringify(preferences)
        );
      } catch (error) {
        console.warn('Could not save preferences', error);
      }
    });

    effect(() => {
      const priority = this.selectedPriority();

      const taskCount = untracked(
        () => this.workItems().length
      );

      console.debug('Priority filter:', priority);
      console.debug('Current task count:', taskCount);
    });
  }

  private restorePreferences(): void {
    try {
      const saved = localStorage.getItem(this.preferenceKey);

      if (!saved) {
        return;
      }

      const preferences: unknown = JSON.parse(saved);

      if (
        typeof preferences !== 'object' ||
        preferences === null
      ) {
        return;
      }

      const data = preferences as Record<string, unknown>;

      const priority = data['priority'];

      if (
        priority === 'All' ||
        priority === 'Low' ||
        priority === 'Medium' ||
        priority === 'High'
      ) {
        this.selectedPriority.set(priority);
      }

      if (typeof data['compactView'] === 'boolean') {
        this.compactView.set(data['compactView']);
      }

    } catch (error) {
      console.warn('Could not restore preferences', error);
    }
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    if (
      value === 'All' ||
      value === 'Pending' ||
      value === 'In Progress' ||
      value === 'Completed'
    ) {
      this.selectedStatus.set(value);
    }
  }

  toggleCompactView(): void {
    this.compactView.update(value => !value);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedPriority.set('All');
    this.selectedStatus.set('All');
  }

  getStatusVariant(status: WorkItemStatus): BadgeVariant {
    switch (status) {
      case 'Completed':
        return 'success';

      case 'In Progress':
        return 'primary';

      case 'Pending':
        return 'warning';
    }
  }

  addSampleTask(): void {
    const item: WorkItem = {
      id: this.nextId++,
      title: 'New sample task',
      assignedTo: 'Demo User',
      priority: 'Medium',
      status: 'Pending'
    };

    this.workItems.update(items => [...items, item]);
  }

  requestDelete(id: number): void {
    this.pendingDeleteId.set(id);
  }

  cancelDelete(): void {
    this.pendingDeleteId.set(null);
  }

  deleteSelected(): void {
    const id = this.pendingDeleteId();

    if (id === null) {
      return;
    }

    this.workItems.update(items =>
      items.filter(item => item.id !== id)
    );

    this.pendingDeleteId.set(null);
  }
}
