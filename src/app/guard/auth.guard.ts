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
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.checkLogin();
    return this.authService.checkSessionStatus().then(
      (val) => {
        if (val) return true;
        else {
          this.router.navigateByUrl('/login', { replaceUrl: true });
          return false;
        }
      }
      // filter((val) => val != null),
      // take(1),
      // map((isAuthenticated) => {
      //   console.log('auth', isAuthenticated);
      //   if (isAuthenticated) {
      //     return true;
      //   } else {
      //     this.router.navigateByUrl('/login', { replaceUrl: true });
      //     return false;
      //   }
      // })
    );
  }
}
