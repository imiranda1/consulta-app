import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultas } from '../models/Consultas';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  consultasURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/consultas.php";

  constructor(private http : HttpClient) { }

  getConsultas() : Observable<Consultas[]>{
    console.log("web-servbice get especialidades")
    return this.http.get<Consultas[]>(this.consultasURL);
  }
}
