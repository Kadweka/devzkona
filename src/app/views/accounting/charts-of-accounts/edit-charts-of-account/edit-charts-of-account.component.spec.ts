import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChartsOfAccountComponent } from './edit-charts-of-account.component';

describe('EditChartsOfAccountComponent', () => {
  let component: EditChartsOfAccountComponent;
  let fixture: ComponentFixture<EditChartsOfAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChartsOfAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChartsOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
