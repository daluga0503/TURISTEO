import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeplacePage } from './seeplace.page';

describe('SeeplacePage', () => {
  let component: SeeplacePage;
  let fixture: ComponentFixture<SeeplacePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeeplacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
