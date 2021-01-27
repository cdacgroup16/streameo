import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplansComponent } from './addplans.component';

describe('AddplansComponent', () => {
  let component: AddplansComponent;
  let fixture: ComponentFixture<AddplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
