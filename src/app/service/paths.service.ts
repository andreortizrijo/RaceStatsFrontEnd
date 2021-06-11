import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathsService {

  constructor() { }

  Path(router: any, path:string) {
    return router.navigate([path]);
  }

  CheckSession(router: any) {
    if(localStorage.length > 0) {
      return router.navigate(['/dashboard']);
    }

    if(sessionStorage.length > 0) {
      return router.navigate(['/dashboard']);
    }

    return router.navigate(['/login']);
  }

}
