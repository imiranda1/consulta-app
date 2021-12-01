import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultasMedicoComponent } from './modal-consultas-medico.component';

describe('ModalConsultasMedicoComponent', () => {
  let component: ModalConsultasMedicoComponent;
  let fixture: ComponentFixture<ModalConsultasMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConsultasMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConsultasMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
