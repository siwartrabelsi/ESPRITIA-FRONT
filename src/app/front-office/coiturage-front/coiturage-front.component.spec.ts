import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoiturageFrontComponent } from './coiturage-front.component';

describe('CoiturageFrontComponent', () => {
  let component: CoiturageFrontComponent;
  let fixture: ComponentFixture<CoiturageFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoiturageFrontComponent]
    });
    fixture = TestBed.createComponent(CoiturageFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
