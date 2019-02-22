// import {firebase} from 'firebase/app';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  token: string;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  signIn(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  }

  signUp(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
}
