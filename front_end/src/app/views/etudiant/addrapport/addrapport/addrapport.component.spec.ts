import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrapportComponent } from './addrapport.component';

describe('AddrapportComponent', () => {
  let component: AddrapportComponent;
  let fixture: ComponentFixture<AddrapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrapportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
