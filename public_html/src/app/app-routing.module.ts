import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubastasobreComponent } from './subastasobre/subastasobre.component';
import { SubastamazoComponent } from './subastamazo/subastamazo.component';
import { LoginComponent } from './login/login.component';
import {LoginGuard} from './login/login.guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'subastasobre',component: SubastasobreComponent, canActivate:[LoginGuard]},
  {path:'subastamazo',component: SubastamazoComponent, canActivate:[LoginGuard]},
  {path:'home',component: HomeComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
