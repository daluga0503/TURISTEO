import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/core/models/user-credentials';
import { PasswordValidation } from 'src/app/core/validators/password';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  form:FormGroup|null=null;

  @Input('email') set email(value:string){
    if (this.form) this.form.controls['email'].setValue(value);
  }

  @Output() onsubmit = new EventEmitter<UserCredentials>();

  constructor(
    private router: Router,
    private formBuilder:FormBuilder
    ) {
      
      this.form = this.formBuilder.group({
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required]]
      })
    }

  ngOnInit() {}



  public singUp(){
    this.router.navigate(['singup']);
  }

  onSubmit(){
    this.onsubmit.emit(this.form?.value);
    this.form?.controls['password'].setValue('');
  }
}
