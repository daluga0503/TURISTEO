import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, ToastController, ToastOptions } from '@ionic/angular';
import { BehaviorSubject, take } from 'rxjs';
import { dataURLtoBlob } from 'src/app/core/helpers/blob';
import { Place } from 'src/app/core/models/place';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/api/auth.service';
import { MediaService } from 'src/app/core/service/api/media.service';
import { PlaceService } from 'src/app/core/service/api/place.service';
import { AuthStrapiService } from 'src/app/core/service/api/strapi/auth.strapi.service';
import { UsersService } from 'src/app/core/service/api/users.service';
import { PlaceFormComponent } from 'src/app/shared/components/place-form/place-form.component';

@Component({
  selector: 'app-addplace',
  templateUrl: './addplace.page.html',
  styleUrls: ['./addplace.page.scss'],
})
export class AddplacePage implements OnInit {

  private _places = new BehaviorSubject<Place[]>([]);
  public places$ = this._places.asObservable();

  showButtons = true;


  constructor(
    private toast:ToastController,
    public users:UsersService,
    private PlaceService: PlaceService,
    private modal:ModalController,
    private media:MediaService,
    private auth:AuthService
  ) { }


  ngOnInit() {
    this.auth.userId$.subscribe(userId => {
      if (userId !== null) {
        this.loadPlaces(userId);
      }
    });
    /*
    if(this.auth.id!=undefined){
    this.loadPlaces(this.auth.id);
    }*/
  }

  




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
          console.log('data:', data);
          onDismiss(result);
        }
      });
    
      await modal.present();
  }



  onNewPlace() {
    this.presentForm(null, (result) => {
      if (result && result.data) {
        dataURLtoBlob(result.data.photo, (blob:Blob)=>{
          this.media.upload(blob).subscribe((media:number[])=>{
            result.data.photo = media[0];
            this.PlaceService.addPlace(result.data).subscribe(_ => {
              this._places.next(result); //quitar pq no se si funciona // no me funcionaba pq no le hacia el next y no lo cerraba el observador
              console.log('Result of add new place', result);
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
          )}
      )}
    });
    this._places.complete(); // cerrando el observador
  }



  public loadPlaces(userId:number){
    this.PlaceService.getAllById(userId).subscribe(
      data => {
        console.log('Data loaded successfully:', data);
        this._places.next(data);
        this._places.complete();
      },
      error => {
        console.log(error);
      }
    )
  }

  onEditPlace(place:Place){
    this.presentForm(place, (result) => {
      if (result && result.data) {
        dataURLtoBlob(result.data.photo, (blob:Blob)=>{
          this.media.upload(blob).subscribe((media:number[])=>{
            result.data.photo = media[0];
            this.PlaceService.updatePlace(result.data, place.placeId).subscribe(_ => {
              this._places.next(result); //quitar pq no se si funciona // no me funcionaba pq no le hacia el next y no lo cerraba el observador
              console.log('Result of add new place', result);
              this.toast.create({
                message: 'Place modified successfully',
                duration: 2000,
                position: 'top',
                color: 'success'
              }).then(toast => {
                toast.present();
              });
            });
          }
          )}
      )}
    });
    this._places.complete();
  }





  
  onDeletePlace(place: Place) {
    var _place: Place = {...place};
    this.PlaceService.deletePlace(_place).subscribe(
      {next: place =>{
        const options:ToastOptions = {
          message: `Place deleted`,
          duration:2000,
          position:'bottom',
          color:'danger',
        };
        this.toast.create(options).then(toast=>toast.present());
        },
        error(err) {
            console.log(err);
        }
      });
  }
}
