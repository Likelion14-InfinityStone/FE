/** 모든 API 응답의 공통 필드 */
export interface ApiBase {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
}

/** data가 항상 존재하는 API 응답 */
export interface ApiEnvelope<T> extends ApiBase {
  data: T;
}

/** data가 null일 수 있는 API 응답 */
export interface ApiEnvelopeNullable<T> extends ApiBase {
  data: T | null;
}
