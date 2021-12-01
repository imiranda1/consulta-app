import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from '../models/Paciente';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})
export class ListarPacienteComponent implements OnInit {
  pacienteList: Paciente[];
  pacienteMostrar: Paciente;
  isEditModalVisible = false;
  isDetailsModalVisible = false;

  constructor(private pacienteService: PacienteService,
    private rota: ActivatedRoute,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadPacientes();
  }

  loadPacientes(): void {
    console.log("loading pacientes....");
    this.pacienteService.getPacientes().subscribe(res => {
      this.pacienteList = res;
      console.log(res);
    });
     console.log("teste");
  }

  refresh(){
    this.ngOnInit();
  }

  showPacienteModal(paciente: Paciente){
    console.log("showPacienteModal 1")
    this.isEditModalVisible = true;
    this.pacienteMostrar = paciente;
  }
  showConsultaPacienteModal(paciente: Paciente){
    console.log("showConsultaPacienteModal 1")
    this.isDetailsModalVisible = true;
    this.pacienteMostrar = paciente;
  }
  
  deletePaciente(pacienteId:string){
    this.pacienteService.excluirPaciente(pacienteId).subscribe(res => {
      if(res.ok == true){
        this.toast.success("Paciente excluído com Sucesso");
        location.reload();
      }else{
        this.toast.error("Erro ao excluir o paciente");
      }
    });
  }
}
