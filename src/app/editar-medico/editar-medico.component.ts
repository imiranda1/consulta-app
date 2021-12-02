import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Especialidades } from '../models/Especialidades';
import { Medico } from '../models/Medico';
import { EspecialidadesService } from '../services/especialidades.service';
import { MedicoService } from '../services/medico.service';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.css']
})
export class EditarMedicoComponent implements OnInit {
  especialidades: Especialidades[];
  formEditMedico: FormGroup;
  @Output() update = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Input() medico : Medico;
  constructor(private especialidadesService: EspecialidadesService,
    private medicoService: MedicoService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadEspecialidades();
    this.inicializarForm();
  }

  loadEspecialidades(): void {
    this.especialidadesService.getEspecialidades().subscribe(res => {
      this.especialidades = res;
    });
  }
  close(){
    this.onClose.emit(null);
  }
  private inicializarForm() {
    this.formEditMedico = new FormGroup({
      id: new FormControl(this.medico.id),
      nome: new FormControl(this.medico.nome),
      idEspecialidade: new FormControl(this.medico.idEspecialidade),
    })
  }

  onSubmit(): void {
    if (this.formEditMedico.valid) {
      this.medicoService.editarMedico(this.formEditMedico.value)
        .subscribe((res) => {
          if (res.body.id) {
            this.toastr.success('Edição realizada com Sucesso');
            this.router.navigate(['/listar-medico']);
            this.update.emit(true);
            this.close();
          } else {
            this.toastr.error('Erro na Edição');
          }
        });
    }
  }

}
