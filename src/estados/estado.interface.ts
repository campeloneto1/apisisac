import { Pais } from 'src/paises/pais.interface';
import { User } from 'src/users/user.interface';

export interface Estado {
  id?: number;
  nome: string;
  abreviatura: string;
  pais: Pais;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type Estados = Array<Estado>;
