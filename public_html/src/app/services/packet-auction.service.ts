import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PacketAuction } from '../interfaces/packet-auction';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const api_uri= environment.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class PacketAuctionService {

  headers:HttpHeaders;

  PacketAuctionInterface:PacketAuction = {
    title: null,
    quantity: null,
    min: null,
    max: null,
    prize_id: null,
    user_id: null,
    start_date: null,
    end_date: null
  };

  constructor(private httpClient: HttpClient, private router:Router) { 
    this.headers= new HttpHeaders({'Accept':'aplication/json'});
  }

  getAll(){
    let subastamUser = localStorage.getItem('SubastAmUser');
    let userJson = JSON.parse(subastamUser);
    let token = userJson["token_type"] + " " + userJson["access_token"];
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token });

    return this.httpClient.get(api_uri + '/packetAuction', {headers:headers})
    .pipe(map(data=>{return data}));
    
  }
}
