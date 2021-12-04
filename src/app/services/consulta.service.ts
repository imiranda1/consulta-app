import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Consultas } from '../models/Consultas';
import { ConsultaDTO } from './ConsultaDTO';
import { MedicoService } from './medico.service';
import { PacienteService } from './paciente.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  consultasURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/consultas.php";

  constructor(private http: HttpClient,
              private medicoService: MedicoService,
              private pacienteService:PacienteService) { }

  getConsultas(): Observable<Consultas[]> {
    return this.http.get<Consultas[]>(this.consultasURL);
  }

  cadastrarConsulta(consulta: Consultas): Observable<any> {
    let body = new HttpParams();
    body = body.set("idMedico", consulta.idMedico);
    body = body.set("idPaciente", consulta.idPaciente);
    body = body.set("data", consulta.data + " "+consulta.hora);
    return this.http.post<any>(this.consultasURL, body, { observe: "response" });
  }

  excluirConsulta(idConsulta: string): Observable<any> {
    return this.http.delete(this.consultasURL + "/?id=" + idConsulta, { observe: "response" });
  }


  buscarConsultas() : Observable<any> {
    var lista: ConsultaDTO[] = new Array();
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.medicoService.getMedicos().subscribe(medicos =>{
        this.http.get<Consultas[]>(this.consultasURL).subscribe(consultas =>{
         consultas.map(mapperConsulta =>{
           var consulta : ConsultaDTO = {
             id : mapperConsulta.id,
             paciente : {
               ...pacientes.find(p => p.id === mapperConsulta["idPaciente"])
             },
             medico : {
              ...medicos.find(m => m.id === mapperConsulta["idMedico"])
            },
            data : mapperConsulta.data
           }
           lista.push(consulta);
         })
        })
      })
    })
    return of(lista);
  }

}
