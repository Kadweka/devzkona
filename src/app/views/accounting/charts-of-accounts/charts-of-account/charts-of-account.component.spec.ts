import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsOfAccountComponent } from './charts-of-account.component';

describe('ChartsOfAccountComponent', () => {
  let component: ChartsOfAccountComponent;
  let fixture: ComponentFixture<ChartsOfAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsOfAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
