export interface ApiError {
  status: number;
  code: string;
  message: string;
}

export interface ApiErrorResponse {
  code?: string;
  message?: string;
}