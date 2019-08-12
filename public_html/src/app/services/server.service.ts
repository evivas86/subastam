import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const api_uri= environment.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  headers:HttpHeaders;

  constructor(private httpClient: HttpClient, private router:Router) {
    this.headers= new HttpHeaders({'Accept':'aplication/json'});
   }

  //getServerDate
  getServerDate(){

    return this.httpClient.post(api_uri + '/getServerDate',{headers:this.headers})
    .pipe(map(data=>{return data}));
  }
}
