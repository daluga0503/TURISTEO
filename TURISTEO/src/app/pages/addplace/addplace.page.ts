import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Place } from 'src/app/core/models/place';
import { PlaceService } from 'src/app/core/service/api/place.service';
import { UsersService } from 'src/app/core/service/api/users.service';
import { PlaceFormComponent } from 'src/app/shared/components/place-form/place-form.component';

@Component({
  selector: 'app-addplace',
  templateUrl: './addplace.page.html',
  styleUrls: ['./addplace.page.scss'],
})
export class AddplacePage implements OnInit {


  constructor(
    private toast:ToastController,
    public users:UsersService,
    private PlaceService: PlaceService,
    private modal:ModalController,
  ) { }

  ngOnInit() {}

  async presentForm(data: Place | null, onDismiss: (result: any) => void) {
    const modal = await this.modal.create({
      component: PlaceFormComponent,
      componentProps: {
        place: data,
      },
      cssClass: "modal-full-right-side",
    });
  
    modal.onDidDismiss().then((result) => {
      if (result && result.data) {
        onDismiss(result);
      }
    });
  
    await modal.present();
  }

  onNewPlace() {
    this.presentForm(null, (result) => {
      console.log('Result of add new place', result);
      if (result && result.data) {
        this.PlaceService.addPlace(result.data).subscribe(_ => {
          this.toast.create({
            message: 'Place added successfully',
            duration: 2000,
            position: 'top',
            color: 'success'
          }).then(toast => {
            toast.present();
          });
        });
      }
    });
  }
}
