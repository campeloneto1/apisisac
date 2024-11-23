import { User } from 'src/users/user.interface';

export interface Banco {
  id?: number;
  nome: string;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type Bancos = Array<Banco>;
