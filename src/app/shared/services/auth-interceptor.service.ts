import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';
import {finalize} from 'rxjs/internal/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req);

    return this.authService.userDataSubject.pipe(
      take(1),
      exhaustMap(currUser => {
        console.log('[Interceptor] -> userDataSubject');
        if (!currUser) { return next.handle(req); }
        const modifiedReq = req.clone({params: new HttpParams().set('auth', currUser.token)});
        return next.handle(modifiedReq).pipe(
          finalize(() => {

          })
        );
      })
    );
  }
}
