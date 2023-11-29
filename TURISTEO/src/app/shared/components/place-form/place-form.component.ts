import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/core/models/place';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent  implements OnInit {
  form:FormGroup;
  mode:'New'|'Edit' = 'New';

  //@Input() place: Place|null=null;

  @Input() set place(_place:Place |null){
    console.log(this.place);
    if(_place){
      this.mode='Edit';
      this.form?.controls['name'].setValue(_place.name);
      this.form?.controls['photo'].setValue(_place.photo);
      this.form?.controls['city'].setValue(_place.city);
      this.form?.controls['typePlace'].setValue(_place.typePlace);
    }
  }

  constructor(
    private formBuilder:FormBuilder,
    private _modal:ModalController
  ){
    this.form = this.formBuilder.group({
      photo:['',[Validators.required]],
      name:['', [Validators.required]],
      city:['', [Validators.required]],
      typePlace:['', Validators.required]
    })
  }

  ngOnInit(): void {}


  onSubmit(){
    this._modal.dismiss((this.form.value), 'ok')   
  }
}
