import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    // return this.authService.isAuthenticated.pipe(
    //   filter((val) => val != null),
    //   take(1),
    //   map((isAuthenticated) => {
    //     if (isAuthenticated) {
    //       this.router.navigateByUrl('/tabs', { replaceUrl: true });
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   })
    return this.authService.checkSessionStatus().then((val) => {
      if (val) {
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
        return false;
      } else {
        return true;
      }
    });
  }
}
