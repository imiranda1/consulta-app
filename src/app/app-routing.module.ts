import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { ListarPacienteComponent } from './listar-paciente/listar-paciente.component';
import { CadastroMedicoComponent } from './cadastro-medico/cadastro-medico.component';
import { ListarMedicoComponent } from './listar-medico/listar-medico.component';
import { CadastroConsultaComponent } from './cadastro-consulta/cadastro-consulta.component';



const routes : Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cadastrar-paciente', component: CadastroPacienteComponent},
  {path: 'listar-paciente', component: ListarPacienteComponent},
  {path: 'cadastrar-medico', component: CadastroMedicoComponent},
  {path: 'listar-medico', component: ListarMedicoComponent},
  {path: 'cadastrar-consulta', component: CadastroConsultaComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
