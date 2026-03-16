import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateetudencadrentComponent } from './updateetudencadrent.component';

describe('UpdateetudencadrentComponent', () => {
  let component: UpdateetudencadrentComponent;
  let fixture: ComponentFixture<UpdateetudencadrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateetudencadrentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateetudencadrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
