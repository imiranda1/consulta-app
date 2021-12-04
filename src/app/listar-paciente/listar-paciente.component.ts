import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JWTServiceService } from '../jwtservice.service';
import { Consultas } from '../models/Consultas';
import { Medico } from '../models/Medico';
import { Paciente } from '../models/Paciente';
import { ConsultaService } from '../services/consulta.service';
import { ConsultaDTO } from '../services/ConsultaDTO';
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
  listaConsultas: ConsultaDTO[];
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
        // this.loadConsultas2();

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
    this.pacienteService.getPacientes().subscribe(res => {
      this.pacienteList = res;
    });
  }

  refresh(){
    this.ngOnInit();
  }

  showPacienteModal(paciente: Paciente){
    this.isEditModalVisible = true;
    this.pacienteMostrar = paciente;
  }
  showConsultaPacienteModal(paciente: Paciente){
    this.isDetailsModalVisible = true;
    this.pacienteMostrar = paciente;
  }

  deletePaciente(pacienteId:string){
    if(this.jwtHelper.tokenValidator){
      this.pacienteService.excluirPaciente(pacienteId).subscribe(res => {
        if (res.body.status == "OK") {
          this.toast.success("Paciente excluído com Sucesso");
          this.loadPacientes();
        }else{
          this.toast.error("Erro ao excluir o paciente");
        }
      });
    }else{
      this.toast.error("Sessão Expirada");
      this.router.navigate(['/']);
    }

  }


  loadConsultas(){
    this.serviceConsultas.getConsultas().subscribe(res =>{
      this.consultasList = res;
    });
  }


  loadMedicos(): void {
    this.serviceMedico.getMedicos().subscribe(res => {
      this.medicoList = res;
    });
  }

  // loadConsultas2(): void {
  //   this.serviceConsultas.buscarConsultas().subscribe(res => {
  //     this.listaConsultas = res;
  //     console.log(res);
  //   });
  // }


}
