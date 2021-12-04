import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JWTServiceService } from '../jwtservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private jwtHelper: JWTServiceService,
    private router: Router,
    private toast: ToastrService,) { }

  ngOnInit(): void {
    if(this.jwtHelper.hasToken()){
      if(this.jwtHelper.tokenValidator()){

      }else {
        this.toast.warning("Sua sessão expirou!");
        this.router.navigate(['/']);
      }

    }else{
      this.toast.error("Usuário não logado");
      this.router.navigate(['/']);
    }
  }

}
