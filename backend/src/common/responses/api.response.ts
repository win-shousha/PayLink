export class ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  message?: string;
  timestamp: Date;
}
