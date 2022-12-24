export const BaseUrl = 'http://192.168.2.168:3000/api';

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