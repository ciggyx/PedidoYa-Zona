export class PaginationResultDto<T> {
  zones: T[];
  total: number;
  page: number;
}