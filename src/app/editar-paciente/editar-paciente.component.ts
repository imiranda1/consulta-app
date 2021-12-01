import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from '../models/Paciente';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {

  formEditPaciente: FormGroup;
  @Output() update = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Input() paciente : Paciente;
  constructor(private servicePaciente:PacienteService,
    private toastr: ToastrService,
    private rota: Router) { }


  ngOnInit(): void {
    this.inicializarForm();
  }

  private inicializarForm(){
    this.formEditPaciente = new FormGroup({
      id: new FormControl(this.paciente.id),
      nome: new FormControl(this.paciente.nome),
      dataNascimento: new FormControl(this.paciente.dataNascimento),
    })
  }

  close(){
    this.onClose.emit(null);
  }

  onSubmit(): void {
    if (this.formEditPaciente.valid) {
      this.servicePaciente.editarPaciente(this.formEditPaciente.value)
        .subscribe((res) => {
          if (res.body.id) {
            this.toastr.success('Edição realizada com Sucesso');
            this.rota.navigate(['/listar-paciente']);
            this.update.emit(true);
            this.close();
          } else {
            this.toastr.error('Erro na Edição');
          }
        });
    }
  }

}
