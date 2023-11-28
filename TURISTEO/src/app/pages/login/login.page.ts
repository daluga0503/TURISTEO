import { Component, OnInit } from '@angular/core';
import { UserCredentials } from 'src/app/core/models/user-credentials';
import { AuthService } from 'src/app/core/service/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private auth:AuthService,
  ) { }

  ngOnInit() {
  }



  onLogin(credentials:UserCredentials){
    this.auth.login(credentials).subscribe({
      next:data=>{
        console.log('data:', data);
      },
      error:err =>{
        console.log(err);
      }
    });
  }

}
