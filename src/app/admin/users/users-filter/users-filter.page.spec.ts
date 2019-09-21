import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFilterPage } from './users-filter.page';

describe('UsersFilterPage', () => {
  let component: UsersFilterPage;
  let fixture: ComponentFixture<UsersFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersFilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
