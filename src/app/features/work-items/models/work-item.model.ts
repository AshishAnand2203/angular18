export type WorkItemPriority = 'Low' | 'Medium' | 'High';

export type WorkItemStatus =
  | 'Pending'
  | 'In Progress'
  | 'Completed';

export interface WorkItem {
  id: number;
  title: string;
  assignedTo: string;
  priority: WorkItemPriority;
  status: WorkItemStatus;
}