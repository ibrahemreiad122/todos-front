import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { from } from 'rxjs';
import {UsersService} from '../shared/users.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private userService:UsersService) { }
  
  public get isAuth() : boolean {
    return this.userService.isAuth();
  }

  public get User() : string {
    return this.userService.getUserName();
  }
  
  ngOnInit() {
    
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
