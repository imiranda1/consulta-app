import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JWTServiceService } from '../jwtservice.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private jwtHelper: JWTServiceService, private router: Router) { }

  ngOnInit(): void {
    if(this.jwtHelper.hasToken()){
      if(this.jwtHelper.tokenValidator()){
        this.router.navigate(['/home']);
        }

    }

  }

}
