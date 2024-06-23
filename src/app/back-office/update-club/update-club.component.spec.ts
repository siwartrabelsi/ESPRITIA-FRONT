import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClubComponent } from './update-club.component';

describe('UpdateClubComponent', () => {
  let component: UpdateClubComponent;
  let fixture: ComponentFixture<UpdateClubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateClubComponent]
    });
    fixture = TestBed.createComponent(UpdateClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
