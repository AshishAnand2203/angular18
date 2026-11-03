import { CreateWorkItemDto } from "../../features/work-items/models/work-item.dto";
import { WorkItem } from "../../features/work-items/models/work-item.model";
import { INITIAL_WORK_ITEMS } from "./mock-work-items";

export class MockDatabaseError extends Error{
    constructor(
         public readonly status: number,
    public readonly code: string,
    message: string
    ){
  super(message);
    this.name = 'MockDatabaseError';
    }
}

    export class MockWorkItemsDatabase {
  private readonly storageKey = 'twp-mock-work-items-v1';

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (localStorage.getItem(this.storageKey) !== null) {
      return;
    }

    this.save(INITIAL_WORK_ITEMS);
  }

  private read(): WorkItem[] {
    const raw = localStorage.getItem(this.storageKey);

    if (raw === null) {
      return [];
    }

    try {
      const value: unknown = JSON.parse(raw);

      if (!Array.isArray(value)) {
        throw new Error('Stored data is not an array.');
      }

      if (!value.every(item => this.isWorkItem(item))) {
        throw new Error('Stored records are invalid.');
      }

      return value as WorkItem[];
    } catch {
      throw new MockDatabaseError(
        500,
        'DATA_ERROR',
        'The mock database contains invalid data.'
      );
    }
  }

  private save(items: WorkItem[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch {
      throw new MockDatabaseError(
        500,
        'STORAGE_ERROR',
        'Could not save data to browser storage.'
      );
    }
  }

  private isWorkItem(value: unknown): value is WorkItem {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const item = value as Record<string, unknown>;

    return (
      Number.isSafeInteger(item['id']) &&
      (item['id'] as number) > 0 &&
      typeof item['title'] === 'string' &&
      typeof item['assignedTo'] === 'string' &&
      this.isPriority(item['priority']) &&
      this.isStatus(item['status'])
    );
  }

  private isPriority(
    value: unknown
  ): value is WorkItem['priority'] {
    return (
      value === 'Low' ||
      value === 'Medium' ||
      value === 'High'
    );
  }

  private isStatus(
    value: unknown
  ): value is WorkItem['status'] {
    return (
      value === 'Pending' ||
      value === 'In Progress' ||
      value === 'Completed'
    );
  }

  private validate(
    value: unknown
  ): CreateWorkItemDto {
    if (typeof value !== 'object' || value === null) {
      throw new MockDatabaseError(
        400,
        'VALIDATION_ERROR',
        'A valid work item is required.'
      );
    }

    const data = value as Record<string, unknown>;

    if (
      typeof data['title'] !== 'string' ||
      !data['title'].trim()
    ) {
      throw new MockDatabaseError(
        400,
        'VALIDATION_ERROR',
        'Title is required.'
      );
    }

    if (
      typeof data['assignedTo'] !== 'string' ||
      !data['assignedTo'].trim()
    ) {
      throw new MockDatabaseError(
        400,
        'VALIDATION_ERROR',
        'Assigned employee is required.'
      );
    }

    if (
      !this.isPriority(data['priority']) ||
      !this.isStatus(data['status'])
    ) {
      throw new MockDatabaseError(
        400,
        'VALIDATION_ERROR',
        'Priority or status is invalid.'
      );
    }

    return {
      title: data['title'].trim(),
      assignedTo: data['assignedTo'].trim(),
      priority: data['priority'],
      status: data['status']
    };
  }

  getAll(): WorkItem[] {
    return this.read();
  }

  getById(id: number): WorkItem {
    const item = this.read().find(item => item.id === id);

    if (!item) {
      throw new MockDatabaseError(
        404,
        'NOT_FOUND',
        'Work item not found.'
      );
    }

    return item;
  }

  create(payload: unknown): WorkItem {
    const data = this.validate(payload);
    const items = this.read();

    const nextId = Math.max(100, ...items.map(item => item.id)) + 1;

    const item: WorkItem = {
      id: nextId,
      ...data
    };

    this.save([...items, item]);

    return item;
  }

  update(id: number, payload: unknown): WorkItem {
    const items = this.read();
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
      throw new MockDatabaseError(
        404,
        'NOT_FOUND',
        'Work item not found.'
      );
    }

    const data = this.validate(payload);

    const updated: WorkItem = {
      id,
      ...data
    };

    items[index] = updated;
    this.save(items);

    return updated;
  }

  delete(id: number): void {
    const items = this.read();

    if (!items.some(item => item.id === id)) {
      throw new MockDatabaseError(
        404,
        'NOT_FOUND',
        'Work item not found.'
      );
    }

    this.save(items.filter(item => item.id !== id));
  }

}