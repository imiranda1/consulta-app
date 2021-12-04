import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JWTServiceService } from '../jwtservice.service';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {

  formPaciente: FormGroup;


  constructor(private pacienteService: PacienteService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private jwtHelper: JWTServiceService){ }


  ngOnInit(): void {
    if(this.jwtHelper.hasToken()){
      if(this.jwtHelper.tokenValidator()){
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

  private inicializarForm(){
    this.formPaciente = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null,Validators.required ),
      dataNascimento: new FormControl(null, Validators.required),
      dataCadastro: new FormControl(null),
    })
  }

  cadastrarPaciente(){
    this.pacienteService.cadastrarPaciente(this.formPaciente.value).subscribe(res =>{
      if(res.body.id){
        this.toast.success("Paciente cadastrado com Sucesso");
        this.router.navigate(['/listar-paciente']);
      }
      else{
        this.toast.error("Erro ao cadastrar Paciente");
      }
    });
  }

}
