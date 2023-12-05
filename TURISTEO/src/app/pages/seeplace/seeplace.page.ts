import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, zip } from 'rxjs';
import { Pagination } from 'src/app/core/models/data';
import { favPlace } from 'src/app/core/models/favPlace';
import { Place } from 'src/app/core/models/place';
import { favPlaceService } from 'src/app/core/service/api/favPlace.service';
import { PlaceService } from 'src/app/core/service/api/place.service';


@Component({
  selector: 'app-seeplace',
  templateUrl: './seeplace.page.html',
  styleUrls: ['./seeplace.page.scss'],
})
export class SeeplacePage implements OnInit {

  places: Place[] = [];
  favPlace: favPlace | null = null;

  showButtons = false;
  favButtons = true;

  constructor(
    public placeSvc: PlaceService,
    public favSvc:favPlaceService) { } 

  ngOnInit() {
    console.log('Initializing SeeplacePage...');
    this.loadPlaces();
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

  public onChangeFavorite(place: favPlace){
    if (this.favSvc.isPlaceInFavorites(place.usersId, place.sitiosId.placeId)) {
      this.favSvc.deleteFavorite(place, place.sitiosId.placeId).subscribe(
        () => {
          // Lógica adicional si es necesario
          console.log('Favorite deleted successfully.');
        },
        error => {
          console.log(error);
        }
      );
    }else{
      this.favSvc.addFavorite(place.usersId, place.sitiosId.placeId).subscribe(
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
