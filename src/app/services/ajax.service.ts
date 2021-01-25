import {Injectable} from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor() {
  }

  static async get(url: string, data = {}) {
    try {
      let res: any = await axios.get(url, {params: data});
      res = res.data;
      return new Promise((resolve) => {
        if (res.code === 0) {
          resolve(res);
        } else {
          resolve(res);
        }
      });
    } catch (err) {
      alert('服务器出错');
      console.log(err);
    }
  }

  static async post(url: string, data: any) {
    try {
      let res: any = await axios.post(url, JSON.stringify(data));
      res = res.data;
      return new Promise((resolve, reject) => {
        if (res.code === 0) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    } catch (err) {
      // return (e.message)
      alert('服务器出错');
      console.log(err);
    }
  }
}
