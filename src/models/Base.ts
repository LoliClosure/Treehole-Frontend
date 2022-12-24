export const BaseUrl = 'https://experiment.hawa130.com/api';

export interface ResponseData<T = any> {
  data: T;
  code: number;
  msg: string;
}

export interface ResponseError {
  code: number;
  message: string;
}

export interface ListData<T = any> {
  count: number;
  list: T[];
}