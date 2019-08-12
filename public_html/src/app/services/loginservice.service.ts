import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Logininterface } from '../interfaces/logininterface';
import { map } from 'rxjs/operators';
import { Router, /*RouterStateSnapshot*/ } from '@angular/router';

const api_uri= environment.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers:HttpHeaders;

  Logininterface:Logininterface = {
    email: null,
    password: null,
    remember_me: false
  };

  constructor(private httpClient: HttpClient, private router:Router, 
    //private state: RouterStateSnapshot
    ) { 
    this.headers= new HttpHeaders({'Accept':'aplication/json'});
  }

  sendLogin(strEmail,strPaswword,blRemember){
    if(!blRemember){blRemember= false;}
    this.Logininterface = {
      email: strEmail,
      password: strPaswword,
      remember_me: blRemember
    };

    //console.log(this.Logininterface);
    return this.httpClient.post(api_uri + '/login', this.Logininterface,{headers:this.headers})
    .pipe(map(data=>{return data}));
    //return this.httpClient.post(api_uri + '/login', this.Logininterface,{headers:this.headers});
  }

  sendLogout(){
    let subastamUser = localStorage.getItem('SubastAmUser');
    let userJson = JSON.parse(subastamUser);
    let token = userJson["token_type"] + " " + userJson["access_token"];
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token });
    //console.log(this.Logininterface);
    return this.httpClient.post(api_uri + '/logout', this.Logininterface,{headers:headers})
    .pipe(map(data=>{return data}));
    //return this.httpClient.post(api_uri + '/login', this.Logininterface,{headers:this.headers});
  }

  /*token(){
    let subastamUser = localStorage.getItem('SubastAmUser');
    if(!subastamUser){
      this.router.navigate(['/login'],{queryParams:{urlRequest:this.state.url, mustLogin:true}});
    }
    let userJson = JSON.parse(subastamUser);
    return userJson["token_type"] + " " + userJson["access_token"];
  }*/
}
