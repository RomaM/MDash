import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable, throwError} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userDataSubject: BehaviorSubject<any>;
  userData: Observable<any>;
  token: string;

  // constructor(private afAuth: AngularFireAuth, private httpClient: HttpClient) {
  constructor(private httpClient: HttpClient, private router: Router) {
    this.userDataSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('logged')));
    this.userData = this.userDataSubject.asObservable();
  }

  get currentUser(): any {
    console.log('Current user');
    return this.userDataSubject.value;
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          localStorage.setItem('logged', JSON.stringify(!!response));
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
        localStorage.removeItem('logged');
        this.userDataSubject.next(null);
        console.log('Signed Out');
    });
  }

  isAuthenticated(): Promise<any> {
    return new Promise((res, rej) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          return firebase.auth().currentUser.getIdToken()
            .then(
              token => {
                this.token = token;
                return res(true);
              }
            )
            .catch(error => {
              return rej(error);
            });
        } else {
          return rej(null);
        }
      });
    });
  }

  addUser(user: any) {
    return this.httpClient.post<any>('https://funnelsdetails.firebaseio.com/users.json',
      user
    );
  }
}
