import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipsRunComponent } from './payslips-run.component';

describe('PayslipsRunComponent', () => {
  let component: PayslipsRunComponent;
  let fixture: ComponentFixture<PayslipsRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayslipsRunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayslipsRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
