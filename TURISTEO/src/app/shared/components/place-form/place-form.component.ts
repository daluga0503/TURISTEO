import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { Place, TyplePlace } from 'src/app/core/models/place';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent  implements OnInit {





  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  /*

  @Input() types: TyplePlace[] = Object.values(TyplePlace);
  @Output() placeCreated = new EventEmitter<Place>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private popoverController: PopoverController) {
    this.form = this.formBuilder.group({
      placeName: ['', Validators.required],
      photo: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      typePlace: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.form.valid) {
      const newPlace: Place = {
        placeId: Date.now(),
        ...this.form.value,
      };

      this.placeCreated.emit(newPlace);
      this.dismissPopover();
    }
  }

  async dismissPopover() {
    await this.popoverController.dismiss();
  }
  */
}
