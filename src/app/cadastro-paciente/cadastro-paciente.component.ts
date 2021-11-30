import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {

  formUser: FormGroup;


  constructor(private pacienteService: PacienteService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService ){ }


  ngOnInit(): void {
  }

}
