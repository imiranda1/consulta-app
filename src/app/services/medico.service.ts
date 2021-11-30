import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/Medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  medicoURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/medicos.php";

  constructor(private http : HttpClient) { }


  getMedicos() : Observable<Medico[]>{
    console.log("web-servbice messages")
    return this.http.get<Medico[]>(this.medicoURL);
  }

}
