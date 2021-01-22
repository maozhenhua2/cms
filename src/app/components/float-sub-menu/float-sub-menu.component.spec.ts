import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatSubMenuComponent } from './float-sub-menu.component';

describe('FloatSubMenuComponent', () => {
  let component: FloatSubMenuComponent;
  let fixture: ComponentFixture<FloatSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatSubMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
