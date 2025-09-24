import { Injectable } from '@angular/core';
import { CONSTANTS } from '@mis/configs';

const prefix = CONSTANTS?.STORAGE_PREFIX;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public setData(key: string, value: any) {
    let status = true;
    try {
      localStorage?.setItem(prefix + key, value);
    } catch (error) {
      status = false;
      console.log(error)
    }
    return status;
  }

  public getData(key: string) {
    let result: any = false;
    try {
      const data = localStorage?.getItem(prefix + key);
      result = data;
    } catch (error) {
      result = false;
      console.error(error);
    }
    return result;
  }

  public async deleteData(key: string) {
    let status = true;
    try {
      localStorage.removeItem(prefix + key);
    } catch (error) {
      status = false;
      console.error(error);
    }
    return status;
  }

  public async clearData() {
    let status = true;
    try {
      localStorage.clear();
    } catch (error) {
      status = false;
      console.log(error)
    }
    return status;
  }
}