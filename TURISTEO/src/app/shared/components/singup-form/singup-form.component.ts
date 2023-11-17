import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup-form',
  templateUrl: './singup-form.component.html',
  styleUrls: ['./singup-form.component.scss'],
})
export class SingupFormComponent  implements OnInit {

  form:FormGroup|null=null;

  constructor(
    private route: Router,
    private formBuilder:FormBuilder
    ) {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        surname:['', Validators.required],
        email:['', Validators.required, Validators.email],
        password:['', Validators.required, Validators.minLength(6)],
        confirmPassword:['', Validators.required]
      })
      }
      ngOnInit() {}

  public home(){
    this.route.navigate(['home']);
  } 
}


