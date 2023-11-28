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
  form:FormGroup|null=null;
  mode:'New'|'Edit' = 'New';

  @Input() place:Place|null=null;


  ngOnInit(): void {}

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

  getDirtyValues(form: FormGroup) {
    let dirtyValues:any = {};

    Object.keys(form.controls)
        .forEach(key => {
            let currentControl = form.controls[key];
            if (currentControl.dirty)
              dirtyValues[key] = currentControl.value;
        });
    if(this.mode=='Edit' && this.form!=null)
        dirtyValues['id'] = this.form.controls['id'].value;
    return dirtyValues;
  }



  onSubmit(){
    this._modal.dismiss(this.getDirtyValues(this.form!!), 'ok');
  }
}
