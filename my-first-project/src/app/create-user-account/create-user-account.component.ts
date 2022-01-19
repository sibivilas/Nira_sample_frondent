import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { MyService } from '../myservice'; 
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-create-user-account',
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.css']
})
export class CreateUserAccountComponent implements OnInit {

  Environment_Url:string = environment.url;
  Password:string = environment.password;
  createAccount_Form: FormGroup ;
  url = this.Environment_Url+"Login/"
  account_Submitted = false;


  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router, private myService:MyService) {
    this.create_Account_form();
   }

  ngOnInit(): void {
    
  }


  get CAc_Form () {return this.createAccount_Form.controls;}
  create_Account_form(){

    this.createAccount_Form = this.fb.group({

      login_Name: new FormControl('',[Validators.required,]),      
      login_Email: new FormControl('',[Validators.required,Validators.email]),
      login_Password: new FormControl('',[Validators.required,]),
      login_Password_Confirm: new FormControl('',[Validators.required,]),

    },

    {validator: this.checkIfMatchingPasswords('login_Password', 'login_Password_Confirm')}    
    
    );

  }

  onCreate(){

    this.account_Submitted = true;
    if(this.createAccount_Form.invalid){
      return;
    }

    var obj = {

      login_Name: this.createAccount_Form.value.login_Name,
      login_Email: this.createAccount_Form.value.login_Email,
      login_Password: this.createAccount_Form.value.login_Password

     }


    this.http.post<any>(`${this.url}create_Login`, obj).subscribe(data => {

      if (data.results.status == true) {

        alert(data.results.message);
        this.router.navigate(['../']);

      ////  var _datas = JSON.stringify(data.results.datas);
      ////  sessionStorage.setItem("details_main",this.encrypt(_datas));
      //  this.router.navigate(['admin-Home/']);

      }
      else{
        alert(data.results.message);
      }
    }, err => {

     alert(err);
       
    })




  }


  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }


}
