import { WorkItem } from "../../features/work-items/models/work-item.model";

export const INITIAL_WORK_ITEMS: WorkItem[] = [
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
];