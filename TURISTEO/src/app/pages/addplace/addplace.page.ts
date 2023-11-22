import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Place } from 'src/app/core/models/place';
import { MediaService } from 'src/app/core/service/api/media.service';
import { UsersService } from 'src/app/core/service/api/users.service';
import { PlaceFormComponent } from 'src/app/shared/components/place-form/place-form.component';

@Component({
  selector: 'app-addplace',
  templateUrl: './addplace.page.html',
  styleUrls: ['./addplace.page.scss'],
})
export class AddplacePage implements OnInit {


  constructor(
    private router:Router,
    private toast:ToastController,
    public users:UsersService,
    private media:MediaService,
    private modal:ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}
  /*
  async newPlace(place:Place) {

*/
}
