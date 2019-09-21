import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesFilterPage } from './roles-filter.page';

describe('RolesFilterPage', () => {
  let component: RolesFilterPage;
  let fixture: ComponentFixture<RolesFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesFilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
