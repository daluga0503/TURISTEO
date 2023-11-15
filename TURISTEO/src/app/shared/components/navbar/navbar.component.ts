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

  //asigno el español como idioma seleccionado
  selectedLenguage:string='es';

  constructor(
    private router:Router,
    private translate: LenguageService,
  ) {
    //español como idioma por defecto
    this.translate.defaultLang('es');
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



  public onChangeLanguage(event: any){
    //el idioma seleccionado se iguala al valor seleccionado del evento
    this.selectedLenguage = event.detail.value as string;
    //informa del nuevo valor del idioma pasandole el idioma actualizado
    this.translate.useLanguage(this.selectedLenguage);
  }
}
