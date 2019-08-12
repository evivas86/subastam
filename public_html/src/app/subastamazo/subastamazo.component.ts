import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {TestService} from '../services/test.service';
import { test } from '../interfaces/test';

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
  data : any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getTest().subscribe(data=>{
      this.tests = data;
      this.dataSource=new MatTableDataSource(this.tests);
      console.log(this.tests);
    })
    this.dataSource.sort = this.sort;
  }

}
