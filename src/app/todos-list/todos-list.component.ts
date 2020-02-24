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
  filterTodos: ITodos[] = [];
  private _filterList: string;
  ngOnInit() {
    this.todoService.getAllTodos().subscribe(data => {
      console.log(data);
      this.todosList = data;
      this.filterTodos = this.todosList;
    });
  }
  public get filterList(): string {
    return this._filterList;
  }


  public set filterList(value: string) {
    this._filterList = value;
    this.filterTodos = this._filterList ? this.performFilter(this._filterList) : this.todosList;
  }
  performFilter(_filterList: string): ITodos[] {
    return this.todosList.filter((todoList: ITodos) => {
      // const name = todoList.title.toLowerCase();
      // const searchTerm = _filterList.toLowerCase();
      // const firstIndex = name.indexOf(searchTerm);
      // return firstIndex > -1;
      return todoList.title.toLowerCase().indexOf(_filterList.toLowerCase()) > -1;
    })
  }
  goToCreate() {
    this.router.navigate(["/todo"]);
  }
  onDelete(todo) {
    this.filterTodos = this.todosList.filter(ele => ele._id !== todo._id)
  }
}
