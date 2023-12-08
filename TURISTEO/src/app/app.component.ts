import { Component } from '@angular/core';
import { LanguageService } from './core/service/lenguage.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from './core/service/api/auth.service';
import { User } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user:User|undefined = undefined;

  constructor(
    private router:Router,
    private auth: AuthService
  ) {/*
    this.auth.isLogged$.subscribe(logged=>{
      if(logged){
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login'])
      }
    });*/

    this.auth.isLogged$.subscribe(logged=>{
      
      if(logged){
        this.auth.me().subscribe(data=>{
          this.user = data;
        });
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit(){}

  onSignOut(){
    this.auth.logout().subscribe(_=>{
      this.router.navigate(['/login']);
      this.user = undefined;
    });
  }
}
