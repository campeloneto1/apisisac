import { Marca } from 'src/marcas/marca.interface';
import { User } from 'src/users/user.interface';

export interface Modelo {
  id?: number;
  nome: string;
  abreviatura?: string;
  marca: Marca;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type Modelos = Array<Modelo>;
