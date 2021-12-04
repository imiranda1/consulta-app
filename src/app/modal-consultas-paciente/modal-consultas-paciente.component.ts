import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultaDetalhe } from '../models/ConsultaDetalhe';
import { Consultas } from '../models/Consultas';
import { Medico } from '../models/Medico';
import { Paciente } from '../models/Paciente';
import { ConsultaService } from '../services/consulta.service';
import { ConsultaDTO } from '../services/ConsultaDTO';
import { MedicoService } from '../services/medico.service';

@Component({
  selector: 'app-modal-consultas-paciente',
  templateUrl: './modal-consultas-paciente.component.html',
  styleUrls: ['./modal-consultas-paciente.component.css']
})
export class ModalConsultasPacienteComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Input() paciente: Paciente;
  @Input() listaMedicos: Medico[];
  @Input() listaConsultas: Consultas[];
  @Input() consultas: ConsultaDTO[];


  consultaDetalhes:ConsultaDetalhe[] = []
  filteredList: Consultas[] = [];

  constructor(private serviceConsultas:ConsultaService,
    private serviceMedico: MedicoService,
    private toastr: ToastrService,
    private rota: Router) { }


  ngOnInit(): void {
    this.createConsultaDetalhes(this.paciente);
  }

  filterConsulta(){
    this.filteredList = this.listaConsultas
      .filter(consulta => consulta.idPaciente === this.paciente.id);
  }

  createConsultaDetalhes(paciente:Paciente){
    this.filterConsulta();
      this.filteredList.forEach(consulta => {
        this.consultaDetalhes.push(
          {
            idConsulta: consulta.id,
            nomePaciente: paciente.nome,
            nomeMedico: this.getNomeMedico(consulta.idMedico),
            data:consulta.data
          })
      }
      )
  }

  carregaConsultas(){
    this.createConsultaDetalhes(this.paciente);
  }

  // {idConsulta:consulta.id, nomePaciente: "paciente.nome," nomeMedico: this.getNomeMedico(consulta.idMedico), data:consulta.data}


  getNomeMedico(idMedico: string): string {
    const foundMedico = this.listaMedicos.find(medico => medico.id == idMedico);
    return foundMedico.nome;
  }

  close(){
    this.onClose.emit(null);
  }

  deleteConsulta(consultaId:string){
    this.serviceConsultas.excluirConsulta(consultaId).subscribe(res => {
      if(res.ok == true){
        this.toastr.success("Consulta excluída com Sucesso");
        location.reload();
      }else{
        this.toastr.error("Erro ao excluir a consulta");
      }
    });
  }


}
