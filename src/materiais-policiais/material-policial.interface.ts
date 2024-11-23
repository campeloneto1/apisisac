import { Policial } from 'src/policiais/policial.interface';
import { Subunidade } from 'src/subunidades/subunidade.interface';
import { User } from 'src/users/user.interface';

export interface MaterialPolicial {
  id?: number;
  policial: Policial;
  data_emprestimo: Date;
  data_devolucao?: Date;
  observacoes?: string;
  cautela?: boolean;
  materiais?: any;
  subunidade: Subunidade;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type MateriaisPoliciais = Array<MaterialPolicial>;
