import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Developer, MatchmakingApiService } from 'src/app/services/matchmaking-api.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  loginForm = this.fb.group({
    developer_email: [""],
    developer_password: [""],
  });

  signUpForm = this.fb.group({
    signup_developer_email: [""],
    signup_developer_password: [""],
  });

  get developer_email() {
    return this.loginForm.get('developer_email') as FormControl;
  }

  get developer_password() {
    return this.loginForm.get('developer_password') as FormControl;
  }

  get signup_developer_email() {
    return this.signUpForm.get('signup_developer_email') as FormControl;
  }

  get signup_developer_password() {
    return this.signUpForm.get('signup_developer_password') as FormControl;
  }

  constructor(private fb: FormBuilder, private matchmakingApi: MatchmakingApiService, private auth:AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(fromSignUp: boolean) {
    let credentials:Developer;
    if(fromSignUp) 
      credentials = {developer_email: this.signup_developer_email.value, developer_password: this.signup_developer_password.value};
    else
      credentials = {developer_email: this.developer_email.value, developer_password: this.developer_password.value};

    this.matchmakingApi.login(credentials).subscribe(response =>{
      if(response.status == 200) {
        let token:string = response.body!.substring(response.body!.indexOf(":") + 9);
        this.auth.login(token);
        this.router.navigate(["/"]);
      }
    }, err => {
      if (err.status == 404)
        alert("Developer does not exist");
      else if (err.status == 401)
        alert("Invalid Credentials");
      else if (err.status == 400)
        alert("Invalid Input");
    });
  }

  onSignUp() {
    let credentials:Developer = {developer_email: this.signup_developer_email.value, developer_password: this.signup_developer_password.value};
    this.matchmakingApi.signUp(credentials).subscribe(response =>{
      if(response.status == 200)
        this.onLogin(true);
    }, err => {
      if (err.status == 409) 
        alert("Developer Already exists");
      else if (err.status == 400) 
        alert("Invalid Input");
    });
  }
}
