import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateaffectationComponent } from './updateaffectation.component';

describe('UpdateaffectationComponent', () => {
  let component: UpdateaffectationComponent;
  let fixture: ComponentFixture<UpdateaffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateaffectationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateaffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
