import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ModalController, PopoverController, ToastController, ToastOptions } from '@ionic/angular';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { dataURLtoBlob } from 'src/app/core/helpers/blob';
import { Place } from 'src/app/core/models/place';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/api/auth.service';
import { favPlaceService } from 'src/app/core/service/api/favPlace.service';
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


  showButtons = true;
  favButton = false;

  private id = 0;


  constructor(
    private toast:ToastController,
    public users:UsersService,
    public PlaceService: PlaceService,
    public favPlaceSvc: favPlaceService,
    private modal:ModalController,
    private media:MediaService,
    private auth:AuthService
  ) { }

  ngOnInit() {
    /*
    this.auth.userId$.subscribe(userId => {
      if (userId !== null) {
        this.loadPlaces(userId);
        this.id = userId;
      }
    });
    */

    this.auth.me().subscribe(user =>{
      if (user.id!=null) {
        this.id = user.id;
        this.loadPlaces(user.id)
      }
    })
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
            this.PlaceService.addPlace(result.data, this.id).subscribe(_ => {
              console.log('Result of add new place', result);
              this.toast.create({
                message: 'Place added successfully',
                duration: 2000,
                position: 'middle',
                color: 'success'
              }).then(toast => {
                toast.present();
              });
            });
          }
          )}
      )}
    });
  }

  public loadPlaces(userId:number){
    this.PlaceService.getAllById(userId).subscribe(
      data => {
        console.log('Data loaded successfully:', data);
        
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
            this.PlaceService.updatePlace(result.data, place.placeId, this.id ).subscribe(_ => {
              console.log('Result of add new place', result);
              this.toast.create({
                message: 'Place modified successfully',
                duration: 2000,
                position: 'middle',
                color: 'success'
              }).then(toast => {
                toast.present();
              });
            });
          }
          )}
      )}
    });
  }

  
  onDeletePlace(place: Place){
    var _place: Place = {...place};
    this.PlaceService.deletePlace(_place, this.id).subscribe(
      {next: place =>{
        const options:ToastOptions = {
          message: `Place deleted`,
          duration:2000,
          position:'middle',
          color:'danger',
        };
        this.toast.create(options).then(toast=>toast.present());
        },
        error(err) {
          console.log(err);
        }
      });
    }

    /*
    public onDeletePlace(place: Place): void {
      // Verificar si el lugar está en favoritos de cualquier usuario
      this.favPlaceSvc.getFavId(this.id, place.placeId).subscribe(
        (idFav: number | null) => {
          if (idFav !== null) {
            // Eliminar el lugar de favoritos para cualquier usuario
            this.favPlaceSvc.deleteFavorite(this.id,idFav).subscribe(
              () => {
                console.log('Place removed from favorites for any user.');
                // Ahora puedes proceder a eliminar el lugar
                this.PlaceService.deletePlace(place, this.id).subscribe(
                  () => {
                    console.log('Place deleted successfully.');
                  },
                  error => {
                    console.error('Error deleting place:', error);
                  }
                );
              },
              error => {
                console.error('Error removing place from favorites:', error);
              }
            );
          } else {
            // Si no se encontró en favoritos de ningún usuario elimina el lugar
            this.PlaceService.deletePlace(place, this.id).subscribe(
              () => {
                console.log('Place deleted successfully.');
              },
              error => {
                console.error('Error deleting place:', error);
              }
            );
          }
        },
        error => {
          console.error('Error getting favId for any user:', error);
        }
      );
    }*/


    
  }
