import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventClubComponent } from './event-club.component';

describe('EventClubComponent', () => {
  let component: EventClubComponent;
  let fixture: ComponentFixture<EventClubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventClubComponent]
    });
    fixture = TestBed.createComponent(EventClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
