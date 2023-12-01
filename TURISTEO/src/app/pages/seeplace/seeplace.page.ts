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

  showButtons = false;
  favButtons = true;

  constructor(
    public placeSvc: PlaceService) { } 

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


}
