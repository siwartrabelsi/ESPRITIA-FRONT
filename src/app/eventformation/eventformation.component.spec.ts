import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventformationComponent } from './eventformation.component';

describe('EventformationComponent', () => {
  let component: EventformationComponent;
  let fixture: ComponentFixture<EventformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventformationComponent]
    });
    fixture = TestBed.createComponent(EventformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
