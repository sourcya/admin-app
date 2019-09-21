import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributesPage } from './add-attributes.page';

describe('AddAttributesPage', () => {
  let component: AddAttributesPage;
  let fixture: ComponentFixture<AddAttributesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttributesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
