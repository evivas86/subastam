import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/loginservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroup: FormGroup;
  strEmail: any;
  strPaswword: any;
  blRemember: any;
  urlRequest: string;
  message: string;
  subastamUser: any;
  hide = true;

  constructor(private formbuilder: FormBuilder, private LoginService: LoginService, private router:Router, private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.loginGroup=this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      remember_me:['']
    });
    this.urlRequest = this.route.snapshot.queryParams["urlRequest"];
  }

  onNoClick(): void {
  }

  sendLogin(){


    this.strEmail = this.loginGroup.controls.email.value;
    this.strPaswword = this.loginGroup.controls.password.value;
    this.blRemember = this.loginGroup.controls.remember_me.value;

    if(this.loginGroup.invalid){
      return;
    }

    this.LoginService.sendLogin(this.strEmail,this.strPaswword,this.blRemember).subscribe((data) => {
      console.log(data);
      localStorage.setItem('SubastAmUser', JSON.stringify(data));
      if(this.urlRequest){
        this.router.navigate([this.urlRequest]);
      }else{
        this.router.navigate(["/"]);
      }
    }, (error) =>{
      console.log(error);
      this.message = 'Datos Incorrectos';
    });
  }

}
