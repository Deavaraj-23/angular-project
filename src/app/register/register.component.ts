import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formdata={name:"",email:"",password:""}
submit=false;
errorMessage="";
loading=false;

constructor(private auth:AuthService){}
ngOnInit():void {
  this.auth.canAuthenticate();
}
onSubmit(){
 this.loading=true;
 //call register service
 this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
 .subscribe({
  next:data=>{
    //stire token from response data
    this.auth.storeToken(data.idToken)
    console.log('Register idtoken is '+data.idToken)
    this.auth.canAuthenticate();
  },
  error:data=>{
    if (data.error.error.message=="INVALID_EMAIL"){
      this.errorMessage="invalid email";
    }else if(data.error.error.message=="EMAIL_EXISTS"){
      this.errorMessage="Already Email Exists!"
    }else{
      this.errorMessage="unknown error occured when creating this account!"
    }
  }
 }).add(()=>{
  this.loading=false;
  console.log("register completed")
 })
}
}
;