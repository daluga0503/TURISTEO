import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Place } from 'src/app/core/models/place';

@Component({
  selector: 'app-fav-buttons',
  templateUrl: './fav-buttons.component.html',
  styleUrls: ['./fav-buttons.component.scss'],
})
export class FavButtonsComponent  implements OnInit {

  @Input() place:Place|null=null;

  @Output() favClick:EventEmitter<Place> = new EventEmitter<Place>()

  isFavorite: boolean = false;

  constructor() { }

  ngOnInit() {}

  onFavClick(event:any){
    if (this.place) {
      this.isFavorite = !this.isFavorite;
      this.favClick.emit(this.place);
    }
  }

}
