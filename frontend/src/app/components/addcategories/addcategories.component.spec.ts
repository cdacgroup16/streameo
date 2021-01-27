import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcategoriesComponent } from './addcategories.component';

describe('AddcategoriesComponent', () => {
  let component: AddcategoriesComponent;
  let fixture: ComponentFixture<AddcategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
