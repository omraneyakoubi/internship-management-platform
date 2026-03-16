import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudsujetComponent } from './etudsujet.component';

describe('EtudsujetComponent', () => {
  let component: EtudsujetComponent;
  let fixture: ComponentFixture<EtudsujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudsujetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudsujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
