import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Especialidades } from '../models/Especialidades';
import { EspecialidadesService } from '../services/especialidades.service';
import { MedicoService } from '../services/medico.service';
import {JwtHelperService} from '@auth0/angular-jwt'
import { JWTServiceService } from '../jwtservice.service';

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
    private toast: ToastrService,
    private jwtHelper: JWTServiceService) { }

  ngOnInit(): void {
    if(this.jwtHelper.hasToken()){
      if(this.jwtHelper.tokenValidator()){
        this.loadEspecialidades();
        this.inicializarForm();
      }else {
        this.toast.warning("Sua sessão expirou!");
        this.router.navigate(['/']);
      }

    }else{
      this.toast.error("Usuário não logado");
      this.router.navigate(['/']);
    }
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
      idEspecialidade: new FormControl(null,Validators.required),
      nome: new FormControl(null, Validators.required),

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
