import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private user: Observable<firebase.User | null>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = this.angularFireAuth.authState;
  }

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }

  resetPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }
}
