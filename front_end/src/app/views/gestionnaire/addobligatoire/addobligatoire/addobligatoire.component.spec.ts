import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddobligatoireComponent } from './addobligatoire.component';

describe('AddobligatoireComponent', () => {
  let component: AddobligatoireComponent;
  let fixture: ComponentFixture<AddobligatoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddobligatoireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddobligatoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
