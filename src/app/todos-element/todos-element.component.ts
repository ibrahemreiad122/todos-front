import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ITodos } from "../shared/ITodos";
import { Router } from "@angular/router";
import { TodosService } from '../shared/todos.service';


@Component({
  selector: "app-todos-element",
  templateUrl: "./todos-element.component.html",
  styleUrls: ["./todos-element.component.css"]
})
export class TodosElementComponent implements OnInit {
  @Input() todo: ITodos;
  @Output() onDeleteTodo = new EventEmitter<ITodos>();

  constructor(private router: Router, private todoService: TodosService) { }

  ngOnInit() { }

  updateOne(todo) {
    return this.router.navigate(["/todo", todo._id]);
  }
  deleteOne(todo) {
    this.todoService.deleteTodo(todo._id).subscribe(() => {
      this.onDeleteTodo.emit(todo);
    })
  }

  onComplete(todo, event) {
    todo.completed = event.target.checked;
    this.todoService.updateTodo(todo._id, todo).subscribe(res => {
      todo = res;
    })
  }
}
