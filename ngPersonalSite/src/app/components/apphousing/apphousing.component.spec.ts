import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApphousingComponent } from './apphousing.component';

describe('ApphousingComponent', () => {
  let component: ApphousingComponent;
  let fixture: ComponentFixture<ApphousingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApphousingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApphousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
