import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditplanComponent } from './editplan.component';

describe('EditplanComponent', () => {
  let component: EditplanComponent;
  let fixture: ComponentFixture<EditplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
