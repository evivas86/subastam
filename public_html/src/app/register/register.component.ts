import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerGroup: FormGroup;
  strName: string;
  strEmail: string;
  strPaswword: string;
  strPaswwordC: string;
  urlRequest: string;
  message: string;
  subastamUser: any;
  hide = true;

  constructor(private formbuilder: FormBuilder, private RegisterService: RegisterService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.registerGroup=this.formbuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      c_password:['',[Validators.required]]
    }, {validator: this.checkPasswords});
    this.urlRequest = this.route.snapshot.queryParams["urlRequest"];

  }

  sendRegister(){

    this.strName = this.registerGroup.controls.name.value;
    this.strEmail = this.registerGroup.controls.email.value;
    this.strPaswword = this.registerGroup.controls.password.value;
    this.strPaswwordC = this.registerGroup.controls.c_password.value;

    if(this.registerGroup.invalid){
      return;
    }

    this.RegisterService.sendRegister(this.strName,this.strEmail,this.strPaswword,this.strPaswwordC).subscribe((data) => {
      console.log(data);
      this.router.navigate(["/"]);
    }, (error) =>{
      console.log(error);
      this.message = 'Datos Incorrectos';
    });
  }

  checkPasswords(registerGroup: FormGroup) { // here we have the 'passwords' group
  let pass = registerGroup.controls.password.value;
  let confirmPass = registerGroup.controls.c_password.value;

  return pass === confirmPass ? null : { notSame: true }
}

}
