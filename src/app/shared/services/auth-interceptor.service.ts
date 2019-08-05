import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, of, throwError} from 'rxjs';
import {exhaustMap, take, catchError, finalize} from 'rxjs/operators';
import {SpinnerService} from './spinner.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    console.log(req);

    this.spinnerService.show();
    return this.authService.userDataSubject.pipe(
      take(1),
      exhaustMap(currUser => {
        if (!currUser) { return next.handle(req); }
        const modifiedReq = req.clone({params: new HttpParams().set('auth', currUser.token)});
        return next.handle(modifiedReq).pipe(
          finalize(() => { this.spinnerService.hide(); })
        );
      }),
      catchError( err => {
        this.spinnerService.hide();
        return throwError(err);
      })
    );
  }
}

