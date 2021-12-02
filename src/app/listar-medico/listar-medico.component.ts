import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Consultas } from '../models/Consultas';
import { Medico } from '../models/Medico';
import { Paciente } from '../models/Paciente';
import { ConsultaService } from '../services/consulta.service';
import { MedicoService } from '../services/medico.service';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-listar-medico',
  templateUrl: './listar-medico.component.html',
  styleUrls: ['./listar-medico.component.css']
})
export class ListarMedicoComponent implements OnInit {

  medicoList: Medico[];
  pacienteList:Paciente[];
  consultasList:Consultas[]
  isEditModalVisible = false;
  isDetailsModalVisible = false;
  medicoMostrar: Medico;

  constructor(private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private consultaService: ConsultaService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadMedicos();
    this.loadPacientes();
    this.loadConsultas
  }

  showMedicoModalEditar(medico: Medico) {
    this.isEditModalVisible = true;
    this.medicoMostrar = medico;
  }

  refresh(){
    this.ngOnInit();
  }

  deleteMedico(id: string): void {
    this.medicoService.excluirMedico(id).subscribe(res => {
      if (res.ok == true) {
        this.toast.success("Médico excluído com Sucesso");
        location.reload();
      } else {
        this.toast.error("Erro ao excluir o médico");
      }
    });
  }

  loadMedicos(): void {
    console.log("loading medicos....");
    this.medicoService.getMedicos().subscribe(res => {
      this.medicoList = res;
      console.log(res);
    });
    console.log("teste");
  }

  loadPacientes(): void {
    console.log("loading pacientes....");
    this.pacienteService.getPacientes().subscribe(res => {
      this.pacienteList = res;
      console.log(res);
    });
     console.log("teste");
  }

  loadConsultas(){
    this.consultaService.getConsultas().subscribe(res =>{
      this.consultasList = res;
      console.log(res);
    });
  }

  showConsultaPacienteModal(medico: Medico){
    this.isDetailsModalVisible = true;
    this.medicoMostrar = medico;
  }

}
