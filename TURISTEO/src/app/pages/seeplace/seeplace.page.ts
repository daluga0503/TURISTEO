import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, zip } from 'rxjs';
import { Pagination } from 'src/app/core/models/data';
import { Place } from 'src/app/core/models/place';
import { PlaceService } from 'src/app/core/service/api/place.service';


@Component({
  selector: 'app-seeplace',
  templateUrl: './seeplace.page.html',
  styleUrls: ['./seeplace.page.scss'],
})
export class SeeplacePage implements OnInit {

  private _places = new BehaviorSubject<Place[]>([]);
  public places$ = this._places.asObservable();
  showButtons = false;

  constructor(
    private placeSvc: PlaceService) { } 

  ngOnInit() {
    console.log('Initializing SeeplacePage...');
    this.loadPlaces();
  }

  public loadPlaces(){
    this.placeSvc.getAll().subscribe(
      data => {
        console.log('Data loaded successfully:', data);
        this._places.next(data); // no me funcionaba pq no le hacia el next y no lo cerraba
        this._places.complete();
      },
      error => {
        console.log(error);
      }
    )
  }


}
