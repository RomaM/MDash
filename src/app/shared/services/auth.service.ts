import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  token = '';

  // constructor(private afAuth: AngularFireAuth, private httpClient: HttpClient) {
  constructor(private httpClient: HttpClient) {
    console.log('Auth Service Running...');

    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //       this.userData = user;
    //       this.token = user.refreshToken;
    //       console.log(this.token);
    //       // localStorage.setItem('user', JSON.stringify(this.userData));
    //     } else {
    //       // localStorage.setItem('user', null);
    //     }
    // });

    // this.afAuth.authState.subscribe(user => {
    //   console.log(user);
    //
    //   if (user) {
    //     this.userData = user;
    //     this.token = user.refreshToken;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //   } else {
    //     localStorage.setItem('user', null);
    //   }
    //
    //   console.log(this.token);
    // });
  }

  signIn(email: string, password: string) {
    // this.afAuth.auth.signInWithEmailAndPassword(email, password)
    //   .then(response => {
    //     console.log('Sign In Response: ');
    //     console.log(response);
    //   })
    //   .catch(err => console.log(err));
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          firebase.auth().currentUser.getIdToken()
            .then((token) => {
              this.token = token;
              console.log(this.token);
              return this.token;
            });
        }
      );
  }

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      // localStorage.removeItem('user');
    });
  }

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   // return (user !== null && user.emailVerified !== false) ? true : false;
  //   return (user !== null) ? true : false;
  // }

  getToken() {
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser.getIdToken()
      .then(token => this.token = token);
  }

  addUser(user: any) {
    return this.httpClient.post<any>('https://funnelsdetails.firebaseio.com/users.json',
      user
    );
  }
}
