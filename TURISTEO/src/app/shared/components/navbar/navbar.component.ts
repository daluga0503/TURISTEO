import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  pageTitle = "TURISTEO"

  constructor(
    private router:Router
  ) { }

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

}
