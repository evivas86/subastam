import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PacketAuction } from '../interfaces/packet-auction';
import { Packetdetail } from '../interfaces/packetdetail';
import { Packetarr } from '../interfaces/packetarr';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const api_uri= environment.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class PacketdetailService {

  headers:HttpHeaders;

  PacketDetailInterface:Packetdetail = {
    id:null
  };

  PacketArrInterface:Packetarr = {
    arrIds:null
  };

  PacketAuctionInterface:PacketAuction = {
    id: null,
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

  getDeatilbyId(PacketauctionId:number){

    let subastamUser = localStorage.getItem('SubastAmUser');
    let userJson = JSON.parse(subastamUser);
    let token = userJson["token_type"] + " " + userJson["access_token"];
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token });

      this.PacketDetailInterface = {
        id: PacketauctionId
      };

    return this.httpClient.post(api_uri + '/getPacket',this.PacketDetailInterface, {headers:headers})
    .pipe(map(data=>{
      return data;
    }));
    
  }

  buyPacket(arrPacket:Array<number>){

    let subastamUser = localStorage.getItem('SubastAmUser');
    let userJson = JSON.parse(subastamUser);
    let token = userJson["token_type"] + " " + userJson["access_token"];
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token });

      this.PacketArrInterface = {
        arrIds: arrPacket
      };

    return this.httpClient.post(api_uri + '/buyPacket',this.PacketArrInterface, {headers:headers})
    .pipe(map(data=>{
      return data;
    }));
    
  }
}
