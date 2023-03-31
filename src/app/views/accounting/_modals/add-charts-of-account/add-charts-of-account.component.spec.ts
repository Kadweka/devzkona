import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChartsOfAccountComponent } from './add-charts-of-account.component';

describe('AddChartsOfAccountComponent', () => {
  let component: AddChartsOfAccountComponent;
  let fixture: ComponentFixture<AddChartsOfAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChartsOfAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChartsOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
