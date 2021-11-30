import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { ListarPacienteComponent } from './listar-paciente/listar-paciente.component';
import { ListarMedicoComponent } from './listar-medico/listar-medico.component';
import { CadastroMedicoComponent } from './cadastro-medico/cadastro-medico.component';
import { CadastroConsultaComponent } from './cadastro-consulta/cadastro-consulta.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogInterceptor } from './LogInterceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WelcomeComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    CadastroPacienteComponent,
    ListarPacienteComponent,
    ListarMedicoComponent,
    CadastroMedicoComponent,
    CadastroConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: LogInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
