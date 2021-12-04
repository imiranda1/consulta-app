import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JWTServiceService } from '../jwtservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private jwtHelper : JWTServiceService) { }

  ngOnInit(): void {
  }



  logout(): void{
    sessionStorage.removeItem("token");
    this.router.navigate(['/']);
  }
  homeSession():void{
    if(sessionStorage.getItem('token') != null){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['']);
    }
  }


  isLogged():boolean{
    return (this.jwtHelper.hasToken()  && this.jwtHelper.tokenValidator())?true:false;
  }
}
