import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathsService {

  constructor() { }

  Path(router: any, path:string) {
    return router.navigate([path]);
  }

  RecordPath(router: any, path:string, data:any){
    return router.navigate([path, data])
  }

  CheckSession(router: any) {
    if(localStorage.getItem('token') != undefined) {
      return router.navigate(['/dashboard']);
    };
    if(sessionStorage.getItem('token') != undefined) {
      return router.navigate(['/dashboard']);
    };
  }
}
