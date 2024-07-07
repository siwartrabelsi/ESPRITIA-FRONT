import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParticipantComponent } from './update-participant.component';

describe('UpdateParticipantComponent', () => {
  let component: UpdateParticipantComponent;
  let fixture: ComponentFixture<UpdateParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateParticipantComponent]
    });
    fixture = TestBed.createComponent(UpdateParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
