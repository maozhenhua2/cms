import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraErrorComponent } from './extra-error.component';

describe('ExtraErrorComponent', () => {
  let component: ExtraErrorComponent;
  let fixture: ComponentFixture<ExtraErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
