import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Consultas } from '../models/Consultas';
import { Paciente } from '../models/Paciente';
import { ConsultaService } from '../services/consulta.service';

@Component({
  selector: 'app-modal-consultas-paciente',
  templateUrl: './modal-consultas-paciente.component.html',
  styleUrls: ['./modal-consultas-paciente.component.css']
})
export class ModalConsultasPacienteComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Input() paciente: Paciente;
  
  consultasList:Consultas[]
  
  constructor(private serviceConsultas:ConsultaService,
    private toastr: ToastrService,
    private rota: Router) { }


  ngOnInit(): void {
    this.loadConsultas();
  }

  loadConsultas(): void{
    this.serviceConsultas.getConsultas().subscribe(res =>{
      this.consultasList = res;
      console.log(res);
    });
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
