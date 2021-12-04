import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class JWTServiceService {

  constructor() { }

  tokenValidator(){
  let token = sessionStorage.getItem("token");
  console.log(token)
    if(token){
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);

      console.log("TOKEN EXPIRADO ?: --->> " +isExpired);

      return !isExpired?true:false;
    }
  }

  hasToken(){
    let token = sessionStorage.getItem("token");
    return token?true:false;
  }

}
