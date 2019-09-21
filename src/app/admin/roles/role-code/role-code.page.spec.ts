import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCodePage } from './role-code.page';

describe('RoleCodePage', () => {
  let component: RoleCodePage;
  let fixture: ComponentFixture<RoleCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleCodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
