import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseyinfoComponent } from './caseyinfo.component';

describe('CaseyinfoComponent', () => {
  let component: CaseyinfoComponent;
  let fixture: ComponentFixture<CaseyinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseyinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
