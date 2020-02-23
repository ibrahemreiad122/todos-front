import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { TodoComponent } from "./todo/todo.component";
import { TodosElementComponent } from "./todos-element/todos-element.component";
import { TodosListComponent } from "./todos-list/todos-list.component";
import { from } from "rxjs";

const routes: Routes = [
  {
    component: LoginComponent,
    path: "login",
    pathMatch: "full"
  },
  {
    component: SignupComponent,
    path: "signup",
    pathMatch: "full"
  },
  {
    component: TodoComponent,
    path: "todo",
    pathMatch: "full"
  },
  {
    component: TodoComponent,
    path: "todo/:id",
    pathMatch: "full"
  },
  {
    component: TodosListComponent,
    path: "todos",
    pathMatch: "full"
  },
  {
    component: TodosElementComponent,
    path: "todo/one/:id",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
