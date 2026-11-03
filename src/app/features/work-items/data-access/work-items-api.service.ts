import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../../core/config/api.config';
import { Observable } from 'rxjs';
import { CreateWorkItemDto, UpdateWorkItemDto } from '../models/work-item.dto';
import { WorkItem } from '../models/work-item.model';

@Injectable({
  providedIn: 'root'
})
export class WorkItemsApiService {

  private http = inject(HttpClient);
   private readonly endpoint = `${API_CONFIG.baseUrl}/work-items`;

  constructor() { }

   getAll(): Observable<WorkItem[]> {
    return this.http.get<WorkItem[]>(this.endpoint);
  }

  getById(id: number): Observable<WorkItem> {
    return this.http.get<WorkItem>(`${this.endpoint}/${id}`);
  }

  create(data: CreateWorkItemDto): Observable<WorkItem> {
    return this.http.post<WorkItem>(this.endpoint, data);
  }

  update(
    id: number,
    data: UpdateWorkItemDto
  ): Observable<WorkItem> {
    return this.http.put<WorkItem>(
      `${this.endpoint}/${id}`,
      data
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
