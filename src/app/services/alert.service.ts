import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from '../interfaces/Alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert : Alert = {active: false, error:false, message: ""};

  private alertsSubject = new Subject<{active:boolean, error:boolean, message: string}>();
  constructor() { }

  setStatus(status:boolean){
    this.alert.active = status;
    this.alertsSubject.next({active:this.alert.active, error:this.alert.error, message : this.alert.message});
  }
  setMessage(msg:string){
    this.alert.message = msg;
    this.alertsSubject.next({active:this.alert.active, error:this.alert.error, message : this.alert.message});
  }
  setError(msg:string): void {
    this.alert.error = true;
    this.alert.message = msg;
    this.alertsSubject.next({ active :this.alert.active, error:this.alert.error, message : this.alert.message});
  }

  resetAlert(): void{
    this.alert = {active: false, error:false, message: ""};
    this.alertsSubject.next(this.alert);
  }
  

  onAlert(): Observable<Alert> {
    return this.alertsSubject.asObservable();
  }

}
