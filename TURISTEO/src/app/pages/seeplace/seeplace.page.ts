import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, zip } from 'rxjs';
import { Pagination } from 'src/app/core/models/data';
import { favPlace } from 'src/app/core/models/favPlace';
import { Place } from 'src/app/core/models/place';
import { AuthService } from 'src/app/core/service/api/auth.service';
import { favPlaceService } from 'src/app/core/service/api/favPlace.service';
import { PlaceService } from 'src/app/core/service/api/place.service';


@Component({
  selector: 'app-seeplace',
  templateUrl: './seeplace.page.html',
  styleUrls: ['./seeplace.page.scss'],
})
export class SeeplacePage implements OnInit {

  private id = 0;

  places: Place[] = [];
  favPlace: favPlace | null = null;

  showButtons = false;
  favButtons = true;

  constructor(
    public placeSvc: PlaceService,
    public favSvc:favPlaceService,
    public auth:AuthService) { } 

  ngOnInit() {
    this.auth.me().subscribe(user=>{
      if(user.id !== null){
        this.id = user.id;
        this.loadPlaces();
      }
    });
  }

  public loadPlaces(){
    this.placeSvc.getAll().subscribe(
      data => {
        console.log('Data loaded successfully:', data);
      },
      error => {
        console.log(error);
      }
    )
  }

  public onChangeFavorite(place: Place, favPlace:favPlace){
    if (this.favSvc.isPlaceInFavorites(this.id, place.placeId)) {
      /*
      this.favSvc.deleteFavorite(this.id, favPlace.idFav).subscribe(
        () => {
          // Lógica adicional si es necesario
          console.log('Favorite deleted successfully.');
        },
        error => {
          console.log(error);
        }
      );*/
      this.favSvc.getFavId(this.id, place.placeId).subscribe(
        (idFav: number | null) => {
          if (idFav !== null) {
            this.favSvc.deleteFavorite(this.id, idFav).subscribe(
              () => {
                // Lógica adicional si es necesario
                console.log('Favorite deleted successfully.');
              },
              error => {
                console.log(error);
              }
            );
          } else {
            console.error('No se encontró el idFav.');
          }
        },
        error => {
          console.log(error);
        }
      );
    }else{
      this.favSvc.addFavorite(this.id, place.placeId).subscribe(
        () => {
          // Lógica adicional si es necesario
          console.log('Favorite added successfully.');
        },
        error => {
          console.log(error);
        }
      );
    }
  }


}
