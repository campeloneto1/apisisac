import { MaterialTipo } from 'src/materiais-tipos/material-tipo.interface';
import { Modelo } from 'src/modelos/modelo.interface';
import { Subunidade } from 'src/subunidades/subunidade.interface';
import { User } from 'src/users/user.interface';

export interface Material {
  id?: number;
  subunidade: Subunidade;
  material_tipo: MaterialTipo;
  modelo: Modelo;
  serial?: string;
  data_validade?: Date;
  quantidade: number;
  quantidade_disponivel: number;

  data_baixa?: Date;
  observacoes?: string;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type Materiais = Array<Material>;
