import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCovoiturageFontComponent } from './list-covoiturage-font.component';

describe('ListCovoiturageFontComponent', () => {
  let component: ListCovoiturageFontComponent;
  let fixture: ComponentFixture<ListCovoiturageFontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCovoiturageFontComponent]
    });
    fixture = TestBed.createComponent(ListCovoiturageFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
