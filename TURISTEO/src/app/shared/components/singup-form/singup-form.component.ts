import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup-form',
  templateUrl: './singup-form.component.html',
  styleUrls: ['./singup-form.component.scss'],
})
export class SingupFormComponent  implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {}

  public home(){
    this.route.navigate(['home']);
  } 
}


