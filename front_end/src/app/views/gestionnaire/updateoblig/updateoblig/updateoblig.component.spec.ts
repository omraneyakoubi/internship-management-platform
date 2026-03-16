import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateobligComponent } from './updateoblig.component';

describe('UpdateobligComponent', () => {
  let component: UpdateobligComponent;
  let fixture: ComponentFixture<UpdateobligComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateobligComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateobligComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
