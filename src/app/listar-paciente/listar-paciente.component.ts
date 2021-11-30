import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from '../models/Paciente';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})
export class ListarPacienteComponent implements OnInit {
  pacienteList: Paciente[];


  constructor(private pacienteService: PacienteService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadMedicos();
  }

  loadMedicos(): void {
    console.log("loading medicos....");
    this.pacienteService.getPacientes().subscribe(res => {
      this.pacienteList = res;
      console.log(res);
    });
     console.log("teste");
  }
}
