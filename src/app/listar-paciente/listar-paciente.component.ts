import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JWTServiceService } from '../jwtservice.service';
import { Consultas } from '../models/Consultas';
import { Medico } from '../models/Medico';
import { Paciente } from '../models/Paciente';
import { ConsultaService } from '../services/consulta.service';
import { MedicoService } from '../services/medico.service';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})
export class ListarPacienteComponent implements OnInit {
  pacienteList: Paciente[];
  pacienteMostrar: Paciente;
  isEditModalVisible = false;
  isDetailsModalVisible = false;

  consultasList:Consultas[]
  medicoList:Medico[]

  constructor(private pacienteService: PacienteService,
    private serviceConsultas:ConsultaService,
    private serviceMedico: MedicoService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private jwtHelper: JWTServiceService) { }


  ngOnInit(): void {
    if(this.jwtHelper.hasToken()){
      if(this.jwtHelper.tokenValidator()){
        this.loadPacientes();
        this.loadConsultas();
        this.loadMedicos();

      }else {
        this.toast.warning("Sua sessão expirou!");
        this.router.navigate(['/']);
      }

    }else{
      this.toast.error("Usuário não logado");
      this.router.navigate(['/']);
    }
  }

  loadPacientes(): void {
    console.log("loading pacientes....");
    this.pacienteService.getPacientes().subscribe(res => {
      this.pacienteList = res;
      console.log(res);
    });
     console.log("teste");
  }

  refresh(){
    this.ngOnInit();
  }

  showPacienteModal(paciente: Paciente){
    console.log("showPacienteModal 1")
    this.isEditModalVisible = true;
    this.pacienteMostrar = paciente;
  }
  showConsultaPacienteModal(paciente: Paciente){
    console.log("showConsultaPacienteModal 1")
    this.isDetailsModalVisible = true;
    this.pacienteMostrar = paciente;
  }

  deletePaciente(pacienteId:string){
    this.pacienteService.excluirPaciente(pacienteId).subscribe(res => {
      if (res.body.status == "OK") {
        this.toast.success("Paciente excluído com Sucesso");
        this.loadPacientes();
      }else{
        this.toast.error("Erro ao excluir o paciente");
      }
    });
  }


  loadConsultas(){
    this.serviceConsultas.getConsultas().subscribe(res =>{
      this.consultasList = res;
      console.log(res);
    });
  }


  loadMedicos(): void {
    console.log("loading medicos....");
    this.serviceMedico.getMedicos().subscribe(res => {
      this.medicoList = res;
      console.log(res);
    });
     console.log("teste");
  }
}
