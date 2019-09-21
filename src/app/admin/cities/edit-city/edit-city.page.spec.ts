import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCityPage } from './edit-city.page';

describe('EditCityPage', () => {
  let component: EditCityPage;
  let fixture: ComponentFixture<EditCityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
