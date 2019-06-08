import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {TestService} from '../services/test.service';
import { HttpClient } from '@angular/common/http';
import { test } from '../interfaces/test';
import { environment } from '../../environments/environment.prod';

const api_uri= environment.API_ENDPOINT;

const ELEMENT_DATA: test[] = [
  {id: 1, text: 'text'},
];

@Component({
  selector: 'app-subastamazo',
  templateUrl: './subastamazo.component.html',
  styleUrls: ['./subastamazo.component.css']
})
export class SubastamazoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'text'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  tests : test[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private testService: TestService, private httpClient: HttpClient) {
    httpClient.get(api_uri + '/test').subscribe( (data: test[]) => {
      this.tests = data;
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    })
   }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
