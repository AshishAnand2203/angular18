import {
  WorkItem,
  WorkItemPriority,
  WorkItemStatus
} from './work-item.model';

export interface CreateWorkItemDto {
  title: string;
  assignedTo: string;
  priority: WorkItemPriority;
  status: WorkItemStatus;
}

export type UpdateWorkItemDto = CreateWorkItemDto;

export interface ApiErrorDto {
  code: string;
  message: string;
}

// Use only when an endpoint genuinely returns a list.
export type WorkItemListResponse = WorkItem[];