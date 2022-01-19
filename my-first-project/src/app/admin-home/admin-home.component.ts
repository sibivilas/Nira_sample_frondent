import { Component, OnInit } from '@angular/core';
import { MyService } from '../myservice';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

   title: any;
   title1: any;
   title2: any;
   login_Details:any;

   Environment_Url:string = environment.url;
  Password:string = environment.password;
   


  constructor(private myService:MyService, private adminLoginComponent:AdminLoginComponent, private router: Router) { }

  ngOnInit(): void {
    
     this.myService.currentMessage.subscribe(datas => this.title = datas);
     this.myService.changeMessage(this.title);

     debugger;
     try
      {
        var _details_main = sessionStorage.getItem("details_main");
        var de_details_main = this.decrypt(_details_main);
        this.login_Details = JSON.parse(de_details_main);

        if(this.login_Details === null){
          this.router.navigate(['../']);
        }


     }
     catch{

      this.router.navigate(['../']);

     }



  }

  encrypt(datas:any) {
    return CryptoJS.AES.encrypt(datas, this.Password).toString();
   }
   decrypt(datas:any){
    return CryptoJS.AES.decrypt(datas,this.Password).toString(CryptoJS.enc.Utf8);

   }
   logOut(){
     sessionStorage.clear();
     this.router.navigate(['../']);
     
   }

}
