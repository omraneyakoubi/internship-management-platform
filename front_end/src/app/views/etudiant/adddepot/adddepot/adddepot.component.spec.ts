import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddepotComponent } from './adddepot.component';

describe('AdddepotComponent', () => {
  let component: AdddepotComponent;
  let fixture: ComponentFixture<AdddepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdddepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
