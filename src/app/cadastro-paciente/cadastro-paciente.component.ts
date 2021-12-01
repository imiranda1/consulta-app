import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toast: ToastrService ){ }


  ngOnInit(): void {
    this.inicializarForm();

  }

  private inicializarForm(){
    this.formPaciente = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null),
      dataNascimento: new FormControl(null),
      dataCadastro: new FormControl(null),
    })
  }

  cadastrarPaciente(){
    this.pacienteService.cadastrarPaciente(this.formPaciente.value).subscribe(res =>{
      console.log(res);
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
