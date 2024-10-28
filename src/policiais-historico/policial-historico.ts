import { Policial } from 'src/policiais/policial.interface';
import { Setor } from 'src/setores/setor.interface';
import { User } from 'src/users/user.interface';

export interface PolicialHistorico {
  id?: number;
  policial: Policial;
  setor_origem: Setor;
  setor_destino: Setor;
  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type PoliciaisHistoricos = Array<PolicialHistorico>;
