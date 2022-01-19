import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CreateUserAccountComponent } from './create-user-account/create-user-account.component';

const routes: Routes = [


  {path:"", component:AdminLoginComponent},
    
  {path:"admin-Home", component:AdminHomeComponent},
  {path:"create-user",component:CreateUserAccountComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
