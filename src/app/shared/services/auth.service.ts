import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
// import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable, throwError} from 'rxjs/index';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map, tap} from 'rxjs/operators';
import {CurrentUser} from '../models/user-details.model';
import {environment} from '../../../environments/environment';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userDataSubject = new BehaviorSubject<any>(null);
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  signIn(email: string, password: string) {
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(
    //     response => {
    //       this.userDataSubject.next(response.user.providerData[0]);
    //       this.router.navigate(['/']);
    //     }
    //   )
    //   .catch(error => console.error(error));

    return this.httpClient.post<AuthResponseData>(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${environment.firebase.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      tap(res => {
        this.handleUser(res.email, res.localId, res.idToken, +res.expiresIn);
        this.router.navigate(['/']);
      }),
      catchError(this.handleErrors)
    );
  }

  signUp(email: string, password: string, fullName: string) {
    // return firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then(() => {
    //     const user = firebase.auth().currentUser;
    //     user.updateProfile({displayName: fullName});
    //   });

    return this.httpClient.post<AuthResponseData>(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${environment.firebase.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        tap(res => {
          this.handleUser(res.email, res.localId, res.idToken, +res.expiresIn);
        }),
        catchError(this.handleErrors)
      );
  }

  private handleErrors(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) { return throwError(errorMsg); }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMsg = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMsg = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email address doesn\'t exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'This password is not correct.';
        break;
      case 'USER_DISABLED':
        errorMsg = 'This user account has been disabled.';
        break;
      default:
        break;
    }
    return throwError(errorMsg);
  }

  signOut() {
    // firebase.auth().signOut()
    //   .then(() => {
    //     this.isLogged = false;
    //     this.userDataSubject.next(null);
    //     this.router.navigate(['/auth']);
    //   });

    // this.isLogged = false;

    this.userDataSubject.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData = this.currUser;

    if (!userData) { return; }

    const loadedUser = new CurrentUser(userData.email, userData.uid, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.userDataSubject.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  get currUser(): any {
    const currUser: {
      email: string,
      uid: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    return currUser;
  }

  private handleUser(email: string, uid: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const currUser = new CurrentUser(email, uid, token, expirationDate);
    this.userDataSubject.next(currUser);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(currUser));
  }

  // isAuthenticated(): Promise<any> {
  //   return new Promise((res, rej) => {
  //     firebase.auth().onAuthStateChanged(user => {
  //       if (user) {
  //         this.isLogged = true;
  //         this.userDataSubject.next(user.providerData[0]);
  //         return res(true);
  //       } else {
  //         this.isLogged = false;
  //         return rej(false);
  //       }
  //     });
  //   });
  // }

  // getToken(): Promise<any> {
  //   return firebase.auth().currentUser.getIdToken();
  // }

}
