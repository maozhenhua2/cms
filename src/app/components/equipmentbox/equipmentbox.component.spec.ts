import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentboxComponent } from './equipmentbox.component';

describe('EquipmentboxComponent', () => {
  let component: EquipmentboxComponent;
  let fixture: ComponentFixture<EquipmentboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
