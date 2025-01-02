export const CommonErrorMessages: {
  [key: number]: { message: string; status: number };
} = {
  1: {
    message: '서버 내부 오류가 발생했습니다. 나중에 다시 시도하세요.',
    status: 500,
  },
  2: { message: '요청하신 서비스가 존재하지 않습니다.', status: 401 },
};

export class CommonError extends Error {
  status: number;

  constructor(code?: number) {
    const commonError =
      CommonErrorMessages[code ?? 11] ?? CommonErrorMessages[11];
    super(commonError.message);
    this.status = commonError.status;
    this.name = 'CommonErrorMessages';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CommonError);
    }
  }
}

export interface NotionError {
  name: string;
  code: string;
  status: number;
  headers: { [key: string]: string };
  body: string;
}

export class NotionFetchError extends Error {
  name: string = 'NotionFetchError';
  code: string = 'UNKNOWN_CODE';
  status: number = 500;
  headers: { [key: string]: string } = {};
  body: string = '';

  constructor(error?: NotionError) {
    super(error?.body ?? 'Unknown error');
    if (error) {
      this.code = error.code;
      this.status = error.status;
      this.headers = error.headers;
      this.body = error.body;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotionFetchError);
    }
  }
}
