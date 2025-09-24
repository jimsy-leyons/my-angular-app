import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Globalnotification {
  notifyGlobal: boolean;
  message: string;
  title?: string;
}

@Injectable({
  providedIn: "root",
})
export class GlobalnotifierService {
  private _error!: { message: string; title: string; notifyGlobal: boolean; };
  private _warning!: { message: string; title: string; notifyGlobal: boolean; };
  private _success!: { message: string; title: string; notifyGlobal: boolean; };

  public onError: BehaviorSubject<any>;
  public onWarning: BehaviorSubject<any>;
  public onSuccess: BehaviorSubject<any>;
  constructor() {
    this.onError = new BehaviorSubject({});
    this.onWarning = new BehaviorSubject({});
    this.onSuccess = new BehaviorSubject({});
  }

  error(message: string, title: string = "", notifyGlobal: boolean = true) {
    this._error = {
      message,
      title,
      notifyGlobal,
    };
    this.onError.next(this._error);
  }

  warning(message: string, title: string = "", notifyGlobal: boolean = true) {
    this._warning = {
      message,
      title,
      notifyGlobal,
    };
    this.onWarning.next(this._warning);
  }

  success(message: string, title: string = "", notifyGlobal: boolean = true) {
    this._success = {
      message,
      title,
      notifyGlobal,
    };
    this.onSuccess.next(this._success);
  }
}
