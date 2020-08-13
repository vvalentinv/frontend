import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenusectionComponent } from './add-menusection.component';

describe('AddMenusectionComponent', () => {
  let component: AddMenusectionComponent;
  let fixture: ComponentFixture<AddMenusectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMenusectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenusectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
