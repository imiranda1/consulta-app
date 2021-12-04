import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/Paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/pacientes.php";

  constructor(private http: HttpClient) { }

  cadastrarPaciente(paciente: Paciente): Observable<any> {
    let body = new HttpParams();

    body = body.set("nome", paciente.nome);
    body = body.set("dataNascimento", paciente.dataNascimento);
    return this.http.post<any>(this.pacienteURL, body, { observe: "response" });
  }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.pacienteURL);
  }


  editarPaciente(paciente: Paciente): Observable<any> {
    let body = new HttpParams();

    body = body.set("id", paciente.id);
    body = body.set("nome", paciente.nome);
    body = body.set("dataNascimento", paciente.dataNascimento);
    return this.http.put<any>(this.pacienteURL, body, { observe: "response" });
  }

  excluirPaciente(idPaciente: string): Observable<any> {
    return this.http.delete(this.pacienteURL + "/?id=" + idPaciente, { observe: "response" });
  }




}
