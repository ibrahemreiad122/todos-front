import { Injectable } from "@angular/core";
import { ITodos } from "./ITodos";
import { from, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    auth: localStorage.getItem("token")
  })
};

@Injectable({
  providedIn: "root"
})
export class TodosService {
  private _url: string = "https://teratodo.herokuapp.com/api/todos";
  constructor(private http: HttpClient) {}

  addTodo(todo: ITodos): Observable<ITodos> {
    return this.http.post<ITodos>(this._url, todo, httpOptions);
  }

  updateTodo(todoId: string, todo: ITodos): Observable<ITodos> {
    return this.http.put<ITodos>(`${this._url}/${todoId}`, todo, httpOptions);
  }

  getById(id: string): Observable<ITodos> {
    return this.http.get<ITodos>(`${this._url}/${id}`, httpOptions);
  }

  getAllTodos(): Observable<ITodos[]> {
    return this.http.get<ITodos[]>(this._url, httpOptions);
  }

  deleteTodo(id: string): Observable<ITodos> {
    return this.http.delete<ITodos>(`${this._url}/${id}`, httpOptions);
  }
}
