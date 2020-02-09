import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbtnComponent } from './navbtn.component';

describe('NavbtnComponent', () => {
  let component: NavbtnComponent;
  let fixture: ComponentFixture<NavbtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
