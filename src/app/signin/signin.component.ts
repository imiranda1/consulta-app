import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  formUser: FormGroup;


  constructor(private adminService : AdministradorService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService ){ }

  ngOnInit(): void {
    this.inicializarForm();
    console.log(this.adminService.isLogged());
    if(this.adminService.isLogged() == false){
      this.router.navigate(['/']);

    }else{}
  }

  private inicializarForm(){
    this.formUser = new FormGroup({
      login: new FormControl(""),
      senha: new FormControl(""),
    })
  }

  fazerLogin(){
    this.adminService.fazerLogin(this.formUser.value).subscribe(res => {

      if(res.token){
        this.router.navigate(['/home']);
        this.toast.success("Login realizado com sucesso!");

      }
      else{
        console.log(res.ok)
        this.toast.error("Erro ao realizar login");

      }
    });
  }
}
