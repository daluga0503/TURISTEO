import { Component, Input, OnInit } from '@angular/core';
import { favPlace } from 'src/app/core/models/favPlace';
import { Place } from 'src/app/core/models/place';

@Component({
  selector: 'app-place-fav',
  templateUrl: './place-fav.component.html',
  styleUrls: ['./place-fav.component.scss'],
})
export class PlaceFavComponent  implements OnInit {

  @Input() favPlace: favPlace | null = null;
  constructor() { }

  ngOnInit() {}

}
