import { Component, OnInit } from '@angular/core';
import { favPlace } from 'src/app/core/models/favPlace';
import { Place } from 'src/app/core/models/place';
import { AuthService } from 'src/app/core/service/api/auth.service';
import { favPlaceService } from 'src/app/core/service/api/favPlace.service';

@Component({
  selector: 'app-see-favs',
  templateUrl: './see-favs.page.html',
  styleUrls: ['./see-favs.page.scss'],
})
export class SeeFavsPage implements OnInit {

  private id  = 0;


  constructor(
    public favSvc: favPlaceService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.userId$.subscribe(userId => {
      if (userId !== null) {
        this.loadFavPlaces(userId);
        this.id = userId;
      }
    });
  }


  public loadFavPlaces(userId:number){
    this.favSvc.getPlacesInterestByUser(userId).subscribe(
      data => {
        console.log('Data loaded successfully:', data);
      },
      error => {
        console.log(error);
      }
    )
  }


  addFavorite(sitioId: number): void {
    this.favSvc.addPlaceToFavorites(this.id, sitioId).subscribe(() => {
      // Puedes actualizar la lista de sitios de interés después de agregar uno
      this.favSvc.getPlacesInterestByUser(this.id).subscribe(_=> {
        console.log("Añadido")
      });
    });
  }


  deleteFavorite(sitioId: number): void {
    this.favSvc.deletePlaceFromFavorites(this.id, sitioId).subscribe(() => {
      // Puedes actualizar la lista de sitios de interés después de agregar uno
      this.favSvc.getPlacesInterestByUser(this.id).subscribe(_=> {
        console.log("Eliminado")
      });
    });
  }

}
