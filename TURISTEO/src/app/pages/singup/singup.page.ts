import { Component, OnInit } from '@angular/core';
import { UserRegisterInfo } from 'src/app/core/models/user-register-info';
import { AuthService } from 'src/app/core/service/api/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {

  constructor(
    private auth:AuthService
  ) { }

  ngOnInit() {
  }

  onRegister(credentials:UserRegisterInfo){
    this.auth.register(credentials).subscribe({
      next:data=>{
        console.log(data);
        console.log('success');
      },
      error:err =>{
        console.error(err);
      }      
    });
  }
}
