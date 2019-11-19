import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilePage } from './upload-file.page';

describe('UploadFilePage', () => {
  let component: UploadFilePage;
  let fixture: ComponentFixture<UploadFilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
