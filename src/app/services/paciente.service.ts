import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/Paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/pacientes.php";

  constructor(private http : HttpClient) { }

  cadastrarPaciente(paciente: Paciente): Observable<any>{
    let body = new HttpParams();
    console.log("calling paciente  service");
    console.log(paciente.nome);
    console.log(paciente.dataNascimento);
    body = body.set("nome", paciente.nome);
    body = body.set("dataNascimento", paciente.dataNascimento);
    return this.http.post<any>(this.pacienteURL,body,{observe: "response"});
  }

  getPacientes() : Observable<Paciente[]>{
    console.log("web-servbice messages")
    return this.http.get<Paciente[]>(this.pacienteURL);
  }


  editarPaciente(paciente: Paciente): Observable<any>{
    let body = new HttpParams();
    console.log("calling paciente service to edit");
    console.log(paciente.nome);
    console.log(paciente.dataNascimento);
    body = body.set("id", paciente.id);
    body = body.set("nome", paciente.nome);
    body = body.set("dataNascimento", paciente.dataNascimento);
    return this.http.put<any>(this.pacienteURL,body,{observe: "response"});
  }


}
