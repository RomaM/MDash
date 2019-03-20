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
  userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userData: Observable<any> = this.userDataSubject.asObservable();
  isLogged: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  token: string;


  // constructor(private afAuth: AngularFireAuth, private httpClient: HttpClient) {
  constructor(private httpClient: HttpClient, private router: Router) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
      } else {
        console.log(user);
      }
    });
  }

  get currentUser(): any {
    console.log('Current user');
    return firebase.auth().currentUser;;
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          // localStorage.setItem('logged', JSON.stringify(!!response));
          this.isLogged.next(true);
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
        // localStorage.removeItem('logged');
        this.isLogged.next(false);
        this.userDataSubject.next(null);
        this.router.navigate(['/auth'])
        console.log('Signed Out');
    });
  }

  isAuthenticated(): Promise<any> {
    return new Promise((res, rej) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isLogged.next(true);
          return res(true);
        } else {
          this.isLogged.next(false);
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
