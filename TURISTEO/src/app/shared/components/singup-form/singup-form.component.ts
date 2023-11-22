import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterInfo } from 'src/app/core/models/user-register-info';

@Component({
  selector: 'app-singup-form',
  templateUrl: './singup-form.component.html',
  styleUrls: ['./singup-form.component.scss'],
})
export class SingupFormComponent  implements OnInit {

  form:FormGroup|null=null;

  @Output() onsubmit: EventEmitter<UserRegisterInfo> = new EventEmitter<UserRegisterInfo>();

  constructor(
    private route: Router,
    private formBuilder:FormBuilder,
    ) {
      this.form = this.formBuilder.group({
        username:['', [Validators.required]],
        email:['', [Validators.required, Validators.email]],
        name:['', [Validators.required]],
        surname:['', [Validators.required]],
        password:['', [Validators.required, Validators.minLength(6)]]
      })
    }
      ngOnInit() {}
  
  onSubmit(){
    this.onsubmit.emit(this.form?.value);
    this.form?.controls['password'].setValue('');
  }
}


