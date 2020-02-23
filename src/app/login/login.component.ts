import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { FormBuilder, Validators ,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg;
  constructor(private userservice:UsersService,private formBuilder:FormBuilder, private router: Router) { }
  
  loginForm = this.formBuilder.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  })
  public get email() : AbstractControl {
    return this.loginForm.get('email');
  }

  public get password() : AbstractControl {
    return this.loginForm.get('password');
  }
  login(){
    this.userservice.login(this.email.value,this.password.value)
    .subscribe(()=>{
      this.router.navigate(['/todos'])
    },err => this.errorMsg = err.message);
  }


  ngOnInit() {
  }

}
