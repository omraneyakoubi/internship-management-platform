import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudencadreurComponent } from './etudencadreur.component';

describe('EtudencadreurComponent', () => {
  let component: EtudencadreurComponent;
  let fixture: ComponentFixture<EtudencadreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudencadreurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudencadreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
