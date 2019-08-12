import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../interfaces/register';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const api_uri= environment.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  headers:HttpHeaders;

  RegisterInterface:Register = {
    name: null,
    email: null,
    password: null,
    c_password: null
  };

  constructor(private httpClient: HttpClient, private router:Router) {
    this.headers= new HttpHeaders({'Accept':'aplication/json'});
   }

   sendRegister(strName, strEmail,strPaswword,strPaswwordC){
    this.RegisterInterface = {
      name: strName,
      email: strEmail,
      password: strPaswword,
      c_password: strPaswwordC
    };

    return this.httpClient.post(api_uri + '/register', this.RegisterInterface,{headers:this.headers})
    .pipe(map(data=>{return data}));
  }
}
