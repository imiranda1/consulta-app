import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/User';
import { reduce, tap } from 'rxjs/operators';
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
            }
          })
      );
    }


    fazerLoginCadastro(user: string, pass:string): Observable<any> {
      let body = new HttpParams();
      body = body.set("login",user);
      body = body.set("senha",pass);

      return this.http.put<any>(this.adminURL,body)
        .pipe(
              tap(res => {

            if(res["token"]){
              sessionStorage.setItem("token", res["token"]);
            }
          })
      );
    }


    cadastrar(user: User): Observable<any>{
      let body = new HttpParams();

      body = body.set("login", user.login);
      body = body.set("senha", user.senha);

      return this.http.put<any>(this.adminURL,body)
        .pipe(
              tap(res => {

                if(res["token"]){
                  sessionStorage.setItem("token", res["token"]);
                }
          })

      );

    }
}
