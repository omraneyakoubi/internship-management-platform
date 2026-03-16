import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncadrentComponent } from './encadrent.component';

describe('EncadrentComponent', () => {
  let component: EncadrentComponent;
  let fixture: ComponentFixture<EncadrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncadrentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncadrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
