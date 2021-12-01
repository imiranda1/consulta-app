import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultasPacienteComponent } from './modal-consultas-paciente.component';

describe('ModalConsultasPacienteComponent', () => {
  let component: ModalConsultasPacienteComponent;
  let fixture: ComponentFixture<ModalConsultasPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConsultasPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConsultasPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
