import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Especialidades } from '../models/Especialidades';
import { EspecialidadesService } from '../services/especialidades.service';
import { MedicoService } from '../services/medico.service';

@Component({
  selector: 'app-cadastro-medico',
  templateUrl: './cadastro-medico.component.html',
  styleUrls: ['./cadastro-medico.component.css']
})
export class CadastroMedicoComponent implements OnInit {

  especialidades: Especialidades[];
  formMedico: FormGroup;

  constructor(private especialidadesService: EspecialidadesService,
    private medicoService: MedicoService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadEspecialidades();
    this.inicializarForm();
  }


  loadEspecialidades(): void {
    console.log("loading especialidades....");
    this.especialidadesService.getEspecialidades().subscribe(res => {
      this.especialidades = res;
      console.log(res);
    });
     console.log("teste");
  }

  private inicializarForm(){
    this.formMedico = new FormGroup({
      idEspecialidade: new FormControl(null),
      nome: new FormControl(null),

    })
  }


  cadastrarMedico(){
    this.medicoService.cadastrarMedico(this.formMedico.value).subscribe(res =>{
      console.log(res);
      if(res.body.id){
        this.toast.success("Médico cadastrado com Sucesso");
        this.router.navigate(['/listar-medico']);
      }
      else{
        this.toast.error("Erro ao cadastrar Médico");
      }
    });
  }
}
