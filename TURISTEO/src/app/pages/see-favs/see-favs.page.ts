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


  //favPlace: favPlace |null = null;
  favPlace: favPlace[] = [];

  public id  = 0;


  constructor(
    public favSvc: favPlaceService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    /*
    this.auth.userId$.subscribe(userId => {
      if (userId !== null) {
        this.loadFavPlaces(userId);
        this.id = userId;
      }
    });*/

    this.auth.me().subscribe(user=>{
      if (user.id!=null) {
        this.loadFavPlaces(user.id);
      }
    })
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

}
