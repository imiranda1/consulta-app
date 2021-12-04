import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidades } from '../models/Especialidades';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  especialidadesURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/especialidades.php";

  constructor(private http : HttpClient) { }


  getEspecialidades() : Observable<Especialidades[]>{
    return this.http.get<Especialidades[]>(this.especialidadesURL);
  }
}
