import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angProject';
  name:string="deva";
  age:number=23
  
  getCity(){
    return 'chennai';
  }



  changeauto(event:Event){
    this.name= (<HTMLInputElement>event.target).value;
  }

  flag=true;
  xyz=true;
 
}
