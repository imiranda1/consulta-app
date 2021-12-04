import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultaDetalhe } from '../models/ConsultaDetalhe';
import { Consultas } from '../models/Consultas';
import { Medico } from '../models/Medico';
import { Paciente } from '../models/Paciente';
import { ConsultaService } from '../services/consulta.service';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-modal-consultas-medico',
  templateUrl: './modal-consultas-medico.component.html',
  styleUrls: ['./modal-consultas-medico.component.css']
})
export class ModalConsultasMedicoComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Input() medico: Medico;
  @Input() listaPaciente: Paciente[];
  @Input() listaConsultas: Consultas[];

  consultaDetalhes: ConsultaDetalhe[] = []
  filteredList: Consultas[] = [];

  constructor(private serviceConsultas: ConsultaService,
    private servicePaciente: PacienteService,
    private toastr: ToastrService,
    private rota: Router) { }

  ngOnInit(): void {
    this.createConsultaDetalhes(this.medico);

    console.log(this.listaConsultas);

  }

  createConsultaDetalhes(medico: Medico) {
    this.filterConsulta();
    this.filteredList.forEach(consulta => {
      this.consultaDetalhes.push(
        {
          idConsulta: consulta.id,
          nomePaciente: this.getNomePaciente(consulta.idPaciente),
          nomeMedico: medico.nome,
          data: consulta.data
        })
    }
    )
    console.log(this.consultaDetalhes);
  }

  getNomePaciente(idPaciente: string): string {
    const foundPaciente = this.listaPaciente.find(paciente => paciente.id == idPaciente);
    return foundPaciente.nome;
  }

  filterConsulta() {
    this.filteredList = this.listaConsultas
      .filter(consulta => consulta.idMedico === this.medico.id);
  }

  close() {
    this.onClose.emit(null);
  }

  deleteConsulta(consultaId: string) {
    this.serviceConsultas.excluirConsulta(consultaId).subscribe(res => {
      if (res.ok == true) {
        this.toastr.success("Consulta excluída com Sucesso");
        location.reload();
      } else {
        this.toastr.error("Erro ao excluir a consulta");
      }
    });
  }

}
