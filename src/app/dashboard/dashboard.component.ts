import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private auth:AuthService){}
  user={localId:"",displayName:""};
  ngOnInit(): void {
   this.auth.canAccess();
   if (this.auth.isauthenticated()){
    //call user details sercer
    this.auth.detail().subscribe({next:data=>{
      this.user.localId=data.users[0].localId;
      this.user.displayName=data.users[0].displayName;
    }})
   }
  }

}
