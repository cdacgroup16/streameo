import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideomanagementComponent } from './videomanagement.component';

describe('VideomanagementComponent', () => {
  let component: VideomanagementComponent;
  let fixture: ComponentFixture<VideomanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideomanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideomanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
