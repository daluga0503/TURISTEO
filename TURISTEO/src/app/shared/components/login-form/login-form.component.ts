import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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

  @Output() onsubmit = new EventEmitter<void>();

  constructor(
    private router: Router,
    private formBuilder:FormBuilder
    ) {
      
      this.form = this.formBuilder.group({
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.maxLength(7)]]
      })
    }

  ngOnInit() {}

  public home(){
    this.router.navigate(['home']);
  }

  public singUp(){
    this.router.navigate(['singup']);
  }

  onSubmit(){
    this.onsubmit.emit(this.form?.value);
    this.form?.controls['passworld'].setValue('');
    this.home()
  }
}
