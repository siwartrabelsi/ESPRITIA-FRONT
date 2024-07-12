import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceDashboardComponent } from './espace-dashboard.component';

describe('EspaceDashboardComponent', () => {
  let component: EspaceDashboardComponent;
  let fixture: ComponentFixture<EspaceDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspaceDashboardComponent]
    });
    fixture = TestBed.createComponent(EspaceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
