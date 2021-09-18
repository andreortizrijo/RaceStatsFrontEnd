import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamdetailService {
  id_observer = new Subject();

  constructor() { }

  emitID(data:any) {
    return this.id_observer.next(data);
  }

  showObservables() {
    return this.id_observer.observers;
  }
}
