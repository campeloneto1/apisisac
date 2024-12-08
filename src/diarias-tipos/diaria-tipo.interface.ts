import { User } from 'src/users/user.interface';

export interface DiariaTipo {
  id?: number;
  nome: string;
  valor: number;
  ajuda_custo: boolean;
  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type DiariasTipos = Array<DiariaTipo>;
