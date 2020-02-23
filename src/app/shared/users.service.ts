import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { IUser } from "./IUser";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private _url: string = "https://teratodo.herokuapp.com/api";
  constructor(private http: HttpClient) {}

  signup(user: IUser): Observable<HttpResponse<IUser>> {
    return this.http
      .post<any>(`${this._url}/users/register`, user, { observe: "response" })
      .pipe(
        map(res => {
          const token = res.headers.get("auth");
          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(res.body));
          }

          return res.body;
        }),
        catchError(this.handleError)
      );
  }

  login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(
        `${this._url}/users/login`,
        { email: email, password: password },
        { observe: "response" }
      )
      .pipe(
        map(res => {
          const token = res.headers.get("auth");
          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(res.body));
          }
          return res.body;
        }),
        catchError(this.handleError)
      );
  }
  isAuth() {
    const token = localStorage.getItem("token");

    if (token) return true;

    return false;
  }

  getUserName() {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user).name;

    return;
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `error is ${err.error.message}`;
    } else {
      errorMessage = err.error.message;
    }

    // console.log('handleError', err);
    return throwError(new Error(errorMessage));
  }
}
