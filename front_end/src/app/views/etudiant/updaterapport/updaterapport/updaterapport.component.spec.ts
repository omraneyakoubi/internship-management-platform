import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterapportComponent } from './updaterapport.component';

describe('UpdaterapportComponent', () => {
  let component: UpdaterapportComponent;
  let fixture: ComponentFixture<UpdaterapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdaterapportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdaterapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
