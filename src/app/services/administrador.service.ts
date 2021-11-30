import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/User';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  adminURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/administradores.php";

  constructor(private http : HttpClient) { }

  fazerLogin(user: User): Observable<any> {
      let body = new HttpParams();
      body = body.set("login",user.login);
      body = body.set("senha", user.senha);

      return this.http.post<any>(this.adminURL,body)
        .pipe(
              tap(res => {

            if(res["token"]){
              sessionStorage.setItem("token", res["token"]);
               console.log("Autenticado");
            }
          })
      );
    }

    cadastrar(user: User): Observable<any>{
      let body = new HttpParams();
      console.log("calling web service");

      console.log(user.login);
      console.log(user.senha);

      body = body.set("login", user.login);
      body = body.set("senha", user.senha);

      return this.http.put<any>(this.adminURL,body)
        .pipe(
              tap(res => {
                console.log(res["token"]);
                // console.log(res["expiry"]);
            if(res["token"]){
              // console.log("entrou no IF");
              // // console.log(res);
              // console.log(res["token"]);
              // console.log(res["expiry"]);
              sessionStorage.setItem("token", res["token"]);
            }
            console.log("retornou true")

          })

      );

    }

  isLogged(): boolean {
    if(sessionStorage.getItem("token") != null && sessionStorage.getItem("expiry") != null){
      if(parseInt(sessionStorage.getItem("expiry")) > Date.now()){
        return true;
      }
    }
    return false;
  }


}
