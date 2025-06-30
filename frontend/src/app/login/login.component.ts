import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  signup:boolean = false;
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  userName: string = '';
  @Output() loggedInEvent = new EventEmitter<[boolean, string]>();
  constructor(private http: HttpClient) {}
  toggle(){
    this.signup = !this.signup;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please provide both username and password.';
      return;
    }
    const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
    this.http.post<any>(`http://127.0.0.1:5000/auth/signin`, { username: this.username, password: this.password }, { headers })
      .subscribe(
        response => {
          this.successMessage = 'Login successful!';
          this.userName = response["name"];
          console.log(response);
          this.loggedInEvent.emit([true, this.userName]);
        },
        error => {
          this.errorMessage = 'Invalid credentials, please try again.';
          alert(error);
        }
      );
  }

  onSignup() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please provide both username and password.';
      return;
    }
    const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
    this.http.post<any>(`http://127.0.0.1:5000/auth/signup`, { username: this.username, password: this.password }, { headers })
      .subscribe(
        response => {
          this.successMessage = 'Signup successful! Please log in.';
          this.toggle();
          console.log(response);
        },
        error => {
          this.errorMessage = 'Error during signup, please try again.';
          alert(error);
        }
      );
  }
}