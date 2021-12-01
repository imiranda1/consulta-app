import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from '../services/paciente.service';


@Component({
  selector: 'app-modal-consultas-paciente',
  templateUrl: './modal-consultas-paciente.component.html',
  styleUrls: ['./modal-consultas-paciente.component.css']
})
export class ModalConsultasPacienteComponent implements OnInit {

  formEditPaciente: FormGroup;
  @Output() update = new EventEmitter();
  @Output() onClose = new EventEmitter();
  pacienteList:[]
  constructor(private servicePaciente:PacienteService,
    private toastr: ToastrService,
    private rota: Router) { }


  ngOnInit(): void {

  }



  close(){
    this.onClose.emit(null);
  }

}
