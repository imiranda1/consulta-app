import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medico } from '../models/Medico';
import { Paciente } from '../models/Paciente';
import { ConsultaService } from '../services/consulta.service';
import { MedicoService } from '../services/medico.service';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-cadastro-consulta',
  templateUrl: './cadastro-consulta.component.html',
  styleUrls: ['./cadastro-consulta.component.css']
})
export class CadastroConsultaComponent implements OnInit {
  medicoList: Medico[];
  pacienteList: Paciente[];
  formConsulta: FormGroup;
  constructor(private servicePaciente: PacienteService,
    private toastr: ToastrService,
    private rota: Router,
    private serviceConsulta: ConsultaService,
    private serviceMedico: MedicoService) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.loadMedicos();
    this.loadPacientes();
  }
  loadPacientes(): void {
    console.log("loading pacientes....");
    this.servicePaciente.getPacientes().subscribe(res => {
      this.pacienteList = res;
      console.log(res);
    });
    console.log("teste");
  }
  loadMedicos(): void {
    console.log("loading medicos....");
    this.serviceMedico.getMedicos().subscribe(res => {
      this.medicoList = res;
      console.log(res);
    });
    console.log("teste");
  }
  private inicializarForm() {
    this.formConsulta = new FormGroup({
      idMedico: new FormControl(null,Validators.required),
      idPaciente: new FormControl(null,Validators.required),
      data: new FormControl(null,Validators.required),
      hora: new FormControl(null,Validators.required),

    })
  }
  cadastrarConsulta() {
    console.log(this.formConsulta.value);
    this.serviceConsulta.cadastrarConsulta(this.formConsulta.value).subscribe(res => {
      console.log(res);
      if (res.body.id) {
        this.toastr.success("Consulta cadastrado com Sucesso");
        this.rota.navigate(['/listar-paciente']);
      }
      else {
        this.toastr.error("Erro ao cadastrar Paciente");
      }
    });
  }
}
