import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningPayrollCenterComponent } from './running-payroll-center.component';

describe('RunningPayrollCenterComponent', () => {
  let component: RunningPayrollCenterComponent;
  let fixture: ComponentFixture<RunningPayrollCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningPayrollCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningPayrollCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
