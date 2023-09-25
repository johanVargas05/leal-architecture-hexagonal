export interface ResponseEntity<T> {
  ok: boolean;
  code: number;
  message?: string;
  data?: T;
  error?: unknown;
}
