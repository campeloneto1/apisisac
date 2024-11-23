import { Policial } from 'src/policiais/policial.interface';
import { PublicacaoTipo } from 'src/publicacoes-tipos/publicacao-tipo.interface';
import { User } from 'src/users/user.interface';

export interface PolicialPublicacao {
  id?: number;
  policial: Policial;
  publicacao_tipo: PublicacaoTipo;
  texto: string;
  boletim?: string;

  created_by?: User;
  updated_by?: User;
  created_at?: Date;
  updated_at?: Date;
}

export type PoliciaisPublicacoes = Array<PolicialPublicacao>;
