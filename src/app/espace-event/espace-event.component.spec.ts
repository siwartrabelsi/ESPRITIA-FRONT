import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceEventComponent } from './espace-event.component';

describe('EspaceEventComponent', () => {
  let component: EspaceEventComponent;
  let fixture: ComponentFixture<EspaceEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspaceEventComponent]
    });
    fixture = TestBed.createComponent(EspaceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
