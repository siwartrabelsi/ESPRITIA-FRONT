import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCovoiturageComponent } from './edit-covoiturage.component';

describe('EditCovoiturageComponent', () => {
  let component: EditCovoiturageComponent;
  let fixture: ComponentFixture<EditCovoiturageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCovoiturageComponent]
    });
    fixture = TestBed.createComponent(EditCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
