import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermandconditionComponent } from './termandcondition.component';

describe('TermandconditionComponent', () => {
  let component: TermandconditionComponent;
  let fixture: ComponentFixture<TermandconditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermandconditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermandconditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
