import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medico } from '../models/Medico';
import { Paciente } from '../models/Paciente';
import { MedicoService } from '../services/medico.service';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-listar-medico',
  templateUrl: './listar-medico.component.html',
  styleUrls: ['./listar-medico.component.css']
})
export class ListarMedicoComponent implements OnInit {

  medicoList: Medico[];


  constructor(private medicoService: MedicoService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadMedicos();
  }


  loadMedicos(): void {
    console.log("loading medicos....");
    this.medicoService.getMedicos().subscribe(res => {
      this.medicoList = res;
      console.log(res);
    });
     console.log("teste");
  }

}
