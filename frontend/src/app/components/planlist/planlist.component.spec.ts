import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanlistComponent } from './planlist.component';

describe('PlanlistComponent', () => {
  let component: PlanlistComponent;
  let fixture: ComponentFixture<PlanlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
