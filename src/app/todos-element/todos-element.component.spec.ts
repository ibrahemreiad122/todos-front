import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosElementComponent } from './todos-element.component';

describe('TodosElementComponent', () => {
  let component: TodosElementComponent;
  let fixture: ComponentFixture<TodosElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
