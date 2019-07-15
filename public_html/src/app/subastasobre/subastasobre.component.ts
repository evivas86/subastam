import { Component, OnInit } from '@angular/core';
import { test } from '../interfaces/test';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-subastasobre',
  templateUrl: './subastasobre.component.html',
  styleUrls: ['./subastasobre.component.css']
})
export class SubastasobreComponent implements OnInit {
  Test:test = {
    text : null,
  };

  constructor(private testService: TestService) { 
  }

  ngOnInit() {
  }
  saveTest(){
    this.testService.saveTest(this.Test).subscribe((data) => {
      console.log(data);
      alert('Guardado con exito');
    }, (error) =>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }
}
