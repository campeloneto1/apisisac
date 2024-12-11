import { Graduacao } from 'src/graduacoes/graduacao.interface';
import { Policial } from 'src/policiais/policial.interface';
import { User } from 'src/users/user.interface';

export interface PolicialPromocao {
  id?: number;
  policial: Policial;
  graduacao: Graduacao;
  data_promocao: Date;
  boletim: string;
  observacoes: string;
  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type PoliciaisPromocoes = Array<PolicialPromocao>;
