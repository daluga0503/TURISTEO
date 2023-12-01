import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeFavsPage } from './see-favs.page';

describe('SeeFavsPage', () => {
  let component: SeeFavsPage;
  let fixture: ComponentFixture<SeeFavsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeeFavsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
