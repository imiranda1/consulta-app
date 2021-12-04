import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Consultas } from '../models/Consultas';

import { Especialidades } from '../models/Especialidades';
import { Medico } from '../models/Medico';
import { Paciente } from '../models/Paciente';
import { EspecialidadesService } from '../services/especialidades.service';
import { ConsultaService } from '../services/consulta.service';
import { MedicoService } from '../services/medico.service';
import { PacienteService } from '../services/paciente.service';
import { JWTServiceService } from '../jwtservice.service';


@Component({
  selector: 'app-listar-medico',
  templateUrl: './listar-medico.component.html',
  styleUrls: ['./listar-medico.component.css']
})
export class ListarMedicoComponent implements OnInit {

  medicoList: Medico[];
  medicoListDetalhe: Medico[];

  pacienteList: Paciente[];
  consultasList: Consultas[]
  isEditModalVisible = false;
  isDetailsModalVisible = false;
  medicoMostrar: Medico;
  especialidades: Especialidades[];//


  constructor(private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private consultaService: ConsultaService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private especialidadeService: EspecialidadesService,
    private jwtHelper: JWTServiceService) { }

  ngOnInit(): void {
    if(this.jwtHelper.hasToken()){
      if(this.jwtHelper.tokenValidator()){

        this.carregar();
      }else {
        this.toast.warning("Sua sessão expirou!");
        this.router.navigate(['/']);
      }

    }else{
      this.toast.error("Usuário não logado");
      this.router.navigate(['/']);
    }
  }

  showMedicoModalEditar(medico: Medico) {
    this.isEditModalVisible = true;
    this.medicoMostrar = medico;
  }


  refresh(){

    this.ngOnInit();
  }

  deleteMedico(id: string): void {
    console.log("medico deletado")
    this.medicoService.excluirMedico(id).subscribe(res => {
      console.log("medico deletado")
      console.log(res)
      if (res.body.status == "OK") {
        this.toast.success("Médico excluído com Sucesso");
        this.loadMedicos();
      } else {
        this.toast.error("Erro ao excluir o médico");
      }
    });
  }

  loadMedicos(): void {
    console.log("loading medicos....");
    this.medicoService.getMedicos().subscribe(res => {
      this.medicoList = res;
      this.buildMedicoDetalhes();
    });


  }

  buildMedicoDetalhes(){
    this.medicoList.forEach(medico =>{
      console.log("building medico especialidade")
      medico.nomeEspecialdiade = this.getNomeEspecialidadeById(medico.idEspecialidade)
      console.log("building medico especialidade:::" + this.getNomeEspecialidadeById(medico.idEspecialidade))
    })

  }

  getNomeEspecialidadeById(idEspecialidade : string): string{
    const foundEspcDesc = this.especialidades.find(especialidade => especialidade.id == idEspecialidade);
    return foundEspcDesc.nome;

  }

  loadPacientes(): void {
    console.log("loading pacientes....");
    this.pacienteService.getPacientes().subscribe(res => {
      this.pacienteList = res;
    });
  }

  loadConsultas() {
    this.consultaService.getConsultas().subscribe(res => {
      this.consultasList = res;
    });
  }

  async showConsultaMedicoModal(medico: Medico) {
    this.isDetailsModalVisible = true;

    this.medicoMostrar = medico;
  }


  loadEspecialidades(): void {
    this.especialidadeService.getEspecialidades().subscribe(res => {
      this.especialidades = res;
      console.log(res);
    });
  }



  async carregar() {
    await this.loadEspecialidades();
    await this.loadConsultas();
    await this.loadMedicos();
    await this.loadPacientes();
    await this.delay(1000);

  }

  // nossa função delay com suporte a promisse.
  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}
