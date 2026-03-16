import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddetudencadreurComponent } from './addetudencadreur.component';

describe('AddetudencadreurComponent', () => {
  let component: AddetudencadreurComponent;
  let fixture: ComponentFixture<AddetudencadreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddetudencadreurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddetudencadreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
