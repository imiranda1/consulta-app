import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JWTServiceService } from '../jwtservice.service';
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
    private toastr: ToastrService,
    private jwtHelper: JWTServiceService ){ }

  ngOnInit(): void {
    this.inicializarForm();
  }

  private inicializarForm(){
    this.formUser = new FormGroup({
      login: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required),
    })
  }

  fazerLogin(){
    this.adminService.fazerLogin(this.formUser.value).subscribe(res => {
      if(res.token){
        this.router.navigate(['/home']);
        this.toastr.success("Login realizado com sucesso!");
      }
      else{
        console.log(res.ok)
        this.toastr.error("Erro ao realizar login");
      }
    });
  }
}
