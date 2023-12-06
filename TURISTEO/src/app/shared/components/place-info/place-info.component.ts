import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { favPlace } from 'src/app/core/models/favPlace';
import { Place } from 'src/app/core/models/place';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss'],
})
export class PlaceInfoComponent  implements OnInit {

  @Input() place:Place | null=null;

  @Input() showButtons: boolean = true;
  @Input() favButton: boolean = true;

  @Output() editClicked:EventEmitter<Place> = new EventEmitter<Place>();
  @Output() deleteClicked:EventEmitter<Place> = new EventEmitter<Place>();
  @Output() onFavClicked:EventEmitter<Place> = new EventEmitter<Place>()

  constructor() { }

  ngOnInit() {}

  onEditClick(event:any) {
    this.editClicked.emit(event);
  }

  onDeleteClick(event:any) {
    this.deleteClicked.emit(event);
  }

  onFavClick(event:any){
    this.onFavClicked.emit(event);
  }

}
