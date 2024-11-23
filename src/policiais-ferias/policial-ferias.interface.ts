import { Policial } from 'src/policiais/policial.interface';
import { User } from 'src/users/user.interface';

export interface PolicialFerias {
  id?: number;
  policial: Policial;
  ano: number;
  data_inicial: Date;
  data_final: Date;
  dias: number;
  boletim?: string;
  boletim_inicio?: string;
  boletim_retorno?: string;

  created_by?: User;
  updated_by?: User;
  created_at?: Date;
  updated_at?: Date;
}

export type PoliciaisFerias = Array<PolicialFerias>;
