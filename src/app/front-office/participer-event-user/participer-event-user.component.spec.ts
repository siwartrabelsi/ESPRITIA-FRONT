import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticiperEventUserComponent } from './participer-event-user.component';

describe('ParticiperEventUserComponent', () => {
  let component: ParticiperEventUserComponent;
  let fixture: ComponentFixture<ParticiperEventUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticiperEventUserComponent]
    });
    fixture = TestBed.createComponent(ParticiperEventUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
