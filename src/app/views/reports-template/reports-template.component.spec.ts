import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTemplateComponent } from './reports-template.component';

describe('ReportsTemplateComponent', () => {
  let component: ReportsTemplateComponent;
  let fixture: ComponentFixture<ReportsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
