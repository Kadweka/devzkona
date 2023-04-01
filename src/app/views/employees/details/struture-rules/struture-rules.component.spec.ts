import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrutureRulesComponent } from './struture-rules.component';

describe('StrutureRulesComponent', () => {
  let component: StrutureRulesComponent;
  let fixture: ComponentFixture<StrutureRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrutureRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrutureRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
