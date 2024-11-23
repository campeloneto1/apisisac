import { PatrimonioTipo } from 'src/patrimonios-tipos/patrimonio-tipo.interface';
import { Setor } from 'src/setores/setor.interface';
import { User } from 'src/users/user.interface';

export interface Patrimonio {
  id?: number;
  setor: Setor;
  patrimonio_tipo: PatrimonioTipo;
  nome: string;
  serial?: string;
  tombo: string;
  data_baixa?: Date;
  observacoes?: string;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type Patrimonios = Array<Patrimonio>;
