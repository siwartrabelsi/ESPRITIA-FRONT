import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailclubComponent } from './detailclub.component';

describe('DetailclubComponent', () => {
  let component: DetailclubComponent;
  let fixture: ComponentFixture<DetailclubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailclubComponent]
    });
    fixture = TestBed.createComponent(DetailclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
