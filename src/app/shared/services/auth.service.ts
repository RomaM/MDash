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
  userData = this.userDataSubject.asObservable();
  isLogged = !!localStorage.getItem('isLogged');

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          localStorage.setItem('isLogged', 'true');
          this.userDataSubject.next(response.user);
          this.router.navigate(['/']);
        }
      )
      .catch(error => console.error(error));
  }

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  signOut() {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('isLogged');
        this.userDataSubject.next(null);
        this.router.navigate(['/auth'])
        console.log('Signed Out');
    });
  }

  isAuthenticated(): Promise<any> {
    return new Promise((res, rej) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          localStorage.setItem('isLogged', 'true');
          console.log('isAuthenticated');
          return res(true);
        } else {
          localStorage.removeItem('isLogged');
          return rej(false);
        }
      });
    });
  }

  getToken(): Promise<any> {
    return firebase.auth().currentUser.getIdToken();
  }

  addUser(user: any) {
    return this.httpClient.post<any>('https://funnelsdetails.firebaseio.com/users.json',
      user
    );
  }
}
