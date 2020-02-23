import { Component, OnInit } from '@angular/core';
import {UsersService}from'../shared/users.service';
import { FormBuilder, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';

import { Router }from '@angular/router'
import { from } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UsersService,private router:Router ,private formBuilder: FormBuilder) { 

  }

  signupForm = this.formBuilder.group({
    email:['',Validators.required],
    name:['',Validators.required],
    password:['',Validators.required],
    mathPassword:['',Validators.required]
  }, {
    validators: this.MustMatch('password', 'mathPassword')
  })
  signup(){
   this.userService.signup(this.signupForm.value)
   .subscribe(()=>{
     this.router.navigate(["/todos"])
   })

  }
  ngOnInit() {
  }


  
  public get email() : AbstractControl {
    return this.signupForm.get('email');
  }

  public get name() : AbstractControl {
    return this.signupForm.get('name');
  }

  public get password() : AbstractControl {
    return this.signupForm.get('password');
  }

  public get mathPassword() : AbstractControl {
    return this.signupForm.get('mathPassword');
  }
  
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
  }

}
