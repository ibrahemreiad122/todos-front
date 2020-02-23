import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { TodosService } from "../shared/todos.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { from } from "rxjs";
@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  todoId: string = null;
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodosService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  todosForm = this.formBuilder.group({
    title: ["", Validators.required],
    subject: ["", Validators.required],
    completed: [false]
  });

  ngOnInit() {
    this.todoId = this.route.snapshot.paramMap.get("id");
    if (this.todoId) {
      this.todoService
        .getById(this.todoId)
        .pipe(
          map(data => {
            return {
              title: data.title,
              subject: data.subject,
              completed: data.completed
            };
          })
        )
        .subscribe(data => {
          console.log(data);
          this.todosForm.setValue(data);
        });
    }
    console.log("id", this.todoId);
  }

  onSubmin() {
    console.log("onSubmin");
    //call addTodo and pass form data
    if (this.todoId) {
      this.todoService
        .updateTodo(this.todoId, this.todosForm.value)
        .subscribe(data => {
          console.log(`update data:  ${data}`);
          this.location.back();
        });
    } else {
      this.todoService.addTodo(this.todosForm.value).subscribe(data => {
        this.todosForm.reset();
        console.log(`todo data:  ${data}`);
        this.location.back();
      });
    }
  }

  public get title(): AbstractControl {
    return this.todosForm.get("title");
  }
  public get subject(): AbstractControl {
    return this.todosForm.get("subject");
  }
  public get completed(): AbstractControl {
    return this.todosForm.get("completed");
  }
}
