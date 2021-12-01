import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultaDetalhe } from '../models/ConsultaDetalhe';
import { Consultas } from '../models/Consultas';
import { Medico } from '../models/Medico';
import { Paciente } from '../models/Paciente';
import { ConsultaService } from '../services/consulta.service';
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


  consultaDetalhes:ConsultaDetalhe[] = []
  filteredList: Consultas[] = [];

  constructor(private serviceConsultas:ConsultaService,
    private serviceMedico: MedicoService,
    private toastr: ToastrService,
    private rota: Router) { }


  ngOnInit(): void {
    console.log("---------");
    console.log(this.listaConsultas);
    console.log("---------");
    this.createConsultaDetalhes(this.paciente);
  }

  filterConsulta(){
    console.log("filtrando consultas by PACIENTE...")
    console.log(this.listaConsultas)

    this.filteredList = this.listaConsultas.filter(consulta => consulta.idPaciente === this.paciente.id)



    console.log("consultas filtradas by PACIENTE...")
    console.log("consultas {------->>>>}",  this.filteredList)
  }

  createConsultaDetalhes(paciente:Paciente){

    console.log("Criando detalhes da Consulta....")

    this.filterConsulta();
    console.log("filtrando....")
    console.log(this.filteredList)
      this.filteredList.forEach(consulta => {
        this.consultaDetalhes.push(
          {idConsulta: consulta.id, nomePaciente: paciente.nome, nomeMedico: this.getNomeMedico(consulta.idMedico), data:consulta.data})
      }
      )
      console.log(this.consultaDetalhes);
  }

  carregaConsultas(){
    this.createConsultaDetalhes(this.paciente);
  }

  // {idConsulta:consulta.id, nomePaciente: "paciente.nome," nomeMedico: this.getNomeMedico(consulta.idMedico), data:consulta.data}


  getNomeMedico(idMedico: string): string {
    console.log("Buscando Medico....")
    const foundMedico = this.listaMedicos.find(medico => medico.id == idMedico);
    console.log("nome do medico" + foundMedico.nome);
    return foundMedico.nome;
  }


/*
  loadPacientes(): void {
    console.log("loading pacientes....");
    this.pacienteService.getPacientes().subscribe(res => {
      this.pacienteList = res;
      console.log(res);
    });
     console.log("teste");
  }
*/
  close(){
    console.log("Não funciona");
    this.onClose.emit(null);
  }



}
