import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaffectationComponent } from './addaffectation.component';

describe('AddaffectationComponent', () => {
  let component: AddaffectationComponent;
  let fixture: ComponentFixture<AddaffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddaffectationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddaffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
