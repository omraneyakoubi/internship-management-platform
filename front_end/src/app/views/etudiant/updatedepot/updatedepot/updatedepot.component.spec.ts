import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedepotComponent } from './updatedepot.component';

describe('UpdatedepotComponent', () => {
  let component: UpdatedepotComponent;
  let fixture: ComponentFixture<UpdatedepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
