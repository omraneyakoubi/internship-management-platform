import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligatoireComponent } from './obligatoire.component';

describe('ObligatoireComponent', () => {
  let component: ObligatoireComponent;
  let fixture: ComponentFixture<ObligatoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObligatoireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObligatoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
