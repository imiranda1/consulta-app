import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout(): void{
    sessionStorage.removeItem("token");
    this.router.navigate(['/']);
  }
  homeSession():void{
    console.log(sessionStorage);
    if(sessionStorage.getItem('token') != null){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['']);
    }
  }

}
