import { BaseUrl, ResponseData, ResponseError } from '../models/Base';

class ajax {
  static getAuthorization() {
    const token = uni.getStorageSync('token');
    if (token) {
      return 'Bearer ' + token;
    } else {
      return undefined;
    }
  }

  static serialize(obj: { [key: string]: any }) {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }

  static get<T = any>(url: string, params?: { [key: string]: any }): Promise<ResponseData<T>> {
    return new Promise((resolve, reject) => {
      uni.request({
        url: params ? BaseUrl + url + '?' + this.serialize(params) : BaseUrl + url,
        method: 'GET',
        success: (res) => {
          if (res.statusCode >= 400) {
            reject(res.data as ResponseError);
          }
          resolve(res.data as ResponseData<T>);
        },
        fail: (err) => {
          reject(err);
        },
        header: {
          'Authorization': this.getAuthorization(),
        }
      });
    });
  }

  static post<T = any>(url: string, data?: any): Promise<ResponseData<T>> {
    return new Promise((resolve, reject) => {
      uni.request({
        url: BaseUrl + url,
        method: 'POST',
        data,
        header: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthorization(),
        },
        success: (res) => {
          if (res.statusCode >= 400) {
            reject(res.data as ResponseError);
          }
          resolve(res.data as ResponseData<T>);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  }

  static put<T = any>(url: string, data?: any): Promise<ResponseData<T>> {
    return new Promise((resolve, reject) => {
      uni.request({
        url: BaseUrl + url,
        method: 'PUT',
        data,
        header: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthorization(),
        },
        success: (res) => {
          if (res.statusCode >= 400) {
            reject(res.data as ResponseError);
          }
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
          'Authorization': this.getAuthorization(),
        },
        success: (res) => {
          if (res.statusCode >= 400) {
            reject(res.data as ResponseError);
          }
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