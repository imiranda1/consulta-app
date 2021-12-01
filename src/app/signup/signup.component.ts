import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formUser: FormGroup;
  constructor(private web : AdministradorService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.inicializarForm();
  }
  private inicializarForm(){
    this.formUser = new FormGroup({
      nome: new FormControl(""),
      login: new FormControl(""),
      senha: new FormControl(""),
    })
  }

  cadastrar(){
    this.web.cadastrar(this.formUser.value).subscribe(res =>{
      console.log(res);
      if(res.id){
        this.toast.success("Cadastro realizado com Sucesso");
        this.router.navigate(['/home']);
      }
      else{
        this.toast.error("Erro ao cadastrar");
      }
    });
  }

}