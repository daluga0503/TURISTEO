import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'src/app/core/models/place';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss'],
})
export class PlaceInfoComponent  implements OnInit {

  @Input() place:Place | null=null;

  constructor() { }

  ngOnInit() {}

}
