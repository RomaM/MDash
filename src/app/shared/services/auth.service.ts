import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable, throwError} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userDataSubject = new BehaviorSubject<any>(null);
  isLoggedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('isLogged'));

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  set isLogged(value: boolean) {
    value ? localStorage.setItem('isLogged', value.toString()) : localStorage.removeItem('isLogged');
    this.isLoggedSubject.next(value);
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.userDataSubject.next(response.user.providerData[0]);
          this.router.navigate(['/']);
        }
      )
      .catch(error => console.error(error));
  }

  signUp(email: string, password: string, fullName: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({displayName: fullName});
      });
  }

  signOut() {
    firebase.auth().signOut()
      .then(() => {
        this.isLogged = false;
        this.userDataSubject.next(null);
        this.router.navigate(['/auth']);
    });
  }

  isAuthenticated(): Promise<any> {
    return new Promise((res, rej) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isLogged = true;
          this.userDataSubject.next(user.providerData[0]);
          return res(true);
        } else {
          this.isLogged = false;
          return rej(false);
        }
      });
    });
  }

  getToken(): Promise<any> {
    return firebase.auth().currentUser.getIdToken();
  }
}
