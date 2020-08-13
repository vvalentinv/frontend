import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBanerComponent } from './hero-baner.component';

describe('HeroBanerComponent', () => {
  let component: HeroBanerComponent;
  let fixture: ComponentFixture<HeroBanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroBanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroBanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
