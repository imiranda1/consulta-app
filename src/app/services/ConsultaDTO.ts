import { Medico } from "../models/Medico";
import { Paciente } from "../models/Paciente";

export interface ConsultaDTO {
  id: string,
  paciente: Paciente,
  medico: Medico,
  data: string;
}
