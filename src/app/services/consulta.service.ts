import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultas } from '../models/Consultas';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  consultasURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/consultas.php";

  constructor(private http: HttpClient) { }

  getConsultas(): Observable<Consultas[]> {
    console.log("web-servbice get consultas");
    return this.http.get<Consultas[]>(this.consultasURL);
  }

  cadastrarConsulta(consulta: Consultas): Observable<any> {
    console.log(consulta);
    let body = new HttpParams();
    body = body.set("idMedico", consulta.idMedico);
    body = body.set("idPaciente", consulta.idPaciente);
    body = body.set("data", consulta.data + " "+consulta.hora);
    return this.http.post<any>(this.consultasURL, body, { observe: "response" });
  }

}
