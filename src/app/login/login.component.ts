import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formdata={email:"",password:""}
  submit=false;
  loading=false;
  errorMessage="";
  constructor(private auth:AuthService){}
  ngOnInit():void{
    this.auth.canAuthenticate();
  }
onSubmit(){
  this.loading=true;
  this.auth.login(this.formdata.email,this.formdata.password)
  .subscribe({
    next:data=>{
      //stire token from response data
      this.auth.storeToken(data.idToken)
      console.log('Login idtoken is '+data.idToken)
      this.auth.canAuthenticate();
    },
    error:data=>{
      if (data.error.error.message=="INVALID_PASSWORD"||data.error.error.message=='INVALID_EMAIL'){
        this.errorMessage="invalid credentials!"
      }else{
        this.errorMessage="unknown error when logging into this"
      }
    }
  }).add(()=>{
    this.loading=false;
    console.log('login process completed')
  })
  
}
}
