import { Policial } from 'src/policiais/policial.interface';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { User } from 'src/users/user.interface';

export interface ArmamentoEmprestimo {
  id?: number;
  policial: Policial;
  data_emprestimo: Date;
  assinatura_emprestimo: string;
  data_devolucao?: Date;
  assinatura_devolucao: string;
  observacoes?: string;
  cautela?: boolean;
  armamentos?: any;
  subunidade: Subunidade;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type ArmamentosEmprestimos = Array<ArmamentoEmprestimo>;
