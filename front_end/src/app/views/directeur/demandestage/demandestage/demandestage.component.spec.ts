import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandestageComponent } from './demandestage.component';

describe('DemandestageComponent', () => {
  let component: DemandestageComponent;
  let fixture: ComponentFixture<DemandestageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandestageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandestageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
