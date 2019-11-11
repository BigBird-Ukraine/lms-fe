import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuestionFormComponent } from './add-question-form.component';

describe('AddGuestionFormComponent', () => {
  let component: AddGuestionFormComponent;
  let fixture: ComponentFixture<AddGuestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
