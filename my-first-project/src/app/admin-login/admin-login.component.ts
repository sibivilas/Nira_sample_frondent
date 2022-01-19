import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { MyService } from '../myservice'; 
import * as CryptoJS from 'crypto-js'; 


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  Environment_Url:string = environment.url;
  Password:string = environment.password;
  login_Form: FormGroup ;
  url = this.Environment_Url+"Login/"

  login_Submitted = false;

  public passingDatas_public:any;
  passingDatas_privae:any;

  public encryptedMessage: string;
  public decryptedMessage: string;


  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router, private myService:MyService) {
    this.create_Login_form();
   }

  ngOnInit(): void {   
    
    sessionStorage.clear();

  }
 
  

  get lg_Form () {return this.login_Form.controls;}
  create_Login_form(){

    this.login_Form = this.fb.group({

      login_text: new FormControl('',[Validators.required,]),
      login_password: new FormControl('',[Validators.required,]),

    });

  }


  encrypt(datas:any) {
    return CryptoJS.AES.encrypt(datas, this.Password).toString();
   }
   decrypt(datas:any){
    return CryptoJS.AES.decrypt(datas,this.Password).toString(CryptoJS.enc.Utf8);

   }
   
  

   fun(ddd: any){

    return ddd;
   }

   

   log_In(){


    this.login_Submitted = true;
    if(this.login_Form.invalid){
      return;
    }

    // this.myService.changeMessage("Sibi text sent otherPage");
   
     var testDt = this.login_Form.value;

     var obj = {
      login_Email: testDt.login_text,
      login_Password: testDt.login_password

     }

     this.http.post<any>(`${this.url}Login`, obj).subscribe(data => {

       if (data.results.status == true) {

        var _datas = JSON.stringify(data.results.datas);
        sessionStorage.setItem("details_main",this.encrypt(_datas));
        this.router.navigate(['admin-Home/']);

       }
       else{
         alert(data.results.message);
       }
     }, err => {

      alert(err);
        
     })




   }

  

}
