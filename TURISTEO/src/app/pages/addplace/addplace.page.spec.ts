import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AddplacePage } from './addplace.page';

describe('AddplacePage', () => {
  let component: AddplacePage;
  let fixture: ComponentFixture<AddplacePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddplacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
