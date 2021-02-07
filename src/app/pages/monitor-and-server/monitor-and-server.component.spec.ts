import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorAndServerComponent } from './monitor-and-server.component';

describe('MonitorAndServerComponent', () => {
  let component: MonitorAndServerComponent;
  let fixture: ComponentFixture<MonitorAndServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorAndServerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorAndServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
