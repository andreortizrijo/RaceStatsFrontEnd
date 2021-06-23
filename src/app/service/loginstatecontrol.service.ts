import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginstatecontrolService {
  observer = new Subject();

  emit(data:any){
    this.observer.next(data);
  }
}
