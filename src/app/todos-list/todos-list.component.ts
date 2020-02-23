import { Component, OnInit } from "@angular/core";
import { TodosService } from "../shared/todos.service";
import { Router } from "@angular/router";
import { Route } from "@angular/compiler/src/core";
import { ITodos } from "../shared/ITodos";

@Component({
  selector: "app-todos-list",
  templateUrl: "./todos-list.component.html",
  styleUrls: ["./todos-list.component.css"]
})
export class TodosListComponent implements OnInit {
  constructor(private todoService: TodosService, private router: Router) { }

  todosList: ITodos[] = [];

  ngOnInit() {
    this.todoService.getAllTodos().subscribe(data => {
      console.log(data);
      this.todosList = data;
    });
  }
  goToCreate() {
    this.router.navigate(["/todo"]);
  }
  onDelete(todo) {
    this.todosList = this.todosList.filter(ele => ele._id !== todo._id)
  }
}
