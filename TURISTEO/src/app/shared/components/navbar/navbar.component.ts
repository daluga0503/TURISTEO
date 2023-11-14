import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LenguageService } from 'src/app/core/service/lenguage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  pageTitle = "TURISTEO"
  selectedLenguage:string='es';

  constructor(
    private router:Router,
    private translate: LenguageService,
  ) {
    this.selectedLenguage = translate.getLanguage();
  }

  ngOnInit() {}

  public addPlace(){
    this.router.navigate(['addplace'])
  }

  public seePlace(){
    this.router.navigate(['seeplace'])
  }

  public home(){
    this.router.navigate(['home'])
  }

  public onChangeLanguage(){
    this.translate.setLanguage(this.selectedLenguage);
  }


}
