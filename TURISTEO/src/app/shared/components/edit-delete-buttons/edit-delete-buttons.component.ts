import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Place } from 'src/app/core/models/place';

@Component({
  selector: 'app-edit-delete-buttons',
  templateUrl: './edit-delete-buttons.component.html',
  styleUrls: ['./edit-delete-buttons.component.scss'],
})
export class EditDeleteButtonsComponent  implements OnInit {

  @Input() place: Place | null=null;

  @Output() editClick:EventEmitter<Place> = new EventEmitter<Place>()
  @Output() deleteClick:EventEmitter<Place> = new EventEmitter<Place>()

  constructor() { }

  ngOnInit() {}

  onDeleteClick(event:any){
    if (this.place) {
      this.deleteClick.emit(this.place);
    }
  }

  onEditClick(event:any){
    if (this.place!=null) {
      this.editClick.emit(this.place);
    }
  }

}
