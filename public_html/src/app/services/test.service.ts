import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { test } from '../interfaces/test';
import { environment } from '../../environments/environment.prod';

const api_uri= environment.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) { }
  
  getTest(){
  }
  
  saveTest(test:test){
    const headers = new HttpHeaders({'Content-Type':'aplication/json'});
const api_uri= environment.API_ENDPOINT;
return this.httpClient.post(environment.API_ENDPOINT + '/test', test,{headers:headers});
  }
}
