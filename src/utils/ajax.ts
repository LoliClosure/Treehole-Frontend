import { BaseUrl, ResponseData } from '../models/Base';

class ajax {
  static getAuthorization() {
    const token = uni.getStorageSync('token');
    if (token) {
      return 'Bearer ' + token;
    } else {
      return undefined;
    }
  }

  static get<T = any>(url: string): Promise<ResponseData<T>> {
    return new Promise((resolve, reject) => {
      uni.request({
        url: BaseUrl + url,
        method: 'GET',
        success: (res) => {
          resolve(res.data as ResponseData<T>);
        },
        fail: (err) => {
          reject(err);
        },
        header: {
          'authorization': this.getAuthorization(),
        }
      });
    });
  }

  static post<T = any>(url: string, data: any): Promise<ResponseData<T>> {
    return new Promise((resolve, reject) => {
      uni.request({
        url: BaseUrl + url,
        method: 'POST',
        data,
        header: {
          'content-type': 'application/json',
          'authorization': this.getAuthorization(),
        },
        success: (res) => {
          resolve(res.data as ResponseData<T>);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  }

  static put<T = any>(url: string, data: any): Promise<ResponseData<T>> {
    return new Promise((resolve, reject) => {
      uni.request({
        url: BaseUrl + url,
        method: 'PUT',
        data,
        header: {
          'content-type': 'application/json',
          'authorization': this.getAuthorization(),
        },
        success: (res) => {
          resolve(res.data as ResponseData<T>);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  }

  static delete<T = any>(url: string): Promise<ResponseData<T>> {
    return new Promise((resolve, reject) => {
      uni.request({
        url: BaseUrl + url,
        method: 'DELETE',
        header: {
          'authorization': this.getAuthorization(),
        },
        success: (res) => {
          resolve(res.data as ResponseData<T>);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  }
}

export default ajax;