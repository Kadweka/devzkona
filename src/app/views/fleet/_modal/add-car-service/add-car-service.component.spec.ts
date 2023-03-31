import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarServiceComponent } from './add-car-service.component';

describe('AddCarServiceComponent', () => {
  let component: AddCarServiceComponent;
  let fixture: ComponentFixture<AddCarServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCarServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
