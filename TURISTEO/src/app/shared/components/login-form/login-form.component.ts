import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  public home(){
    this.router.navigate(['home']);
  }

  public singUp(){
    this.router.navigate(['singup']);
  }
}
