import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent  implements OnInit {
  form:FormGroup|null=null;


  ngOnInit(): void {}

  constructor(
    private formBuilder:FormBuilder,
    private _modal:ModalController
  ){
    this.form = this.formBuilder.group({
      picture:['',[Validators.required]],
      placeName:['', [Validators.required]],
      city:['', [Validators.required]],
      street:['',[Validators.required]],
      typePlace:['', Validators.required]
    })
  }

  onSubmit(){
    this._modal.dismiss(this.form?.value, 'ok')
  }
}
