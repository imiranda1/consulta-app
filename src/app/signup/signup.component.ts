import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formUser: FormGroup;
  constructor(private adminService : AdministradorService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.inicializarForm();
  }
  private inicializarForm(){
    this.formUser = new FormGroup({
      // nome: new FormControl(null,Validators.required),
      login: new FormControl(null,Validators.required),
      senha: new FormControl(null,Validators.required)
    })
  }

  cadastrar(){
    this.adminService.cadastrar(this.formUser.value).subscribe(res =>{
      if(res.id){
        this.toast.success("Cadastro realizado com Sucesso");
        this.fazerLogin(this.formUser.value);
      }
      else{
        this.toast.error("Erro ao cadastrar");
      }
    });

  }

  fazerLogin(user:User){
    this.adminService.fazerLogin(user).subscribe(res => {
      if(res.token){
        this.router.navigate(['/home']);
        this.toast.success("Login realizado com sucesso!");
      }
      else{
        this.toast.error("Erro ao realizar login");
      }
    });

  }
}
