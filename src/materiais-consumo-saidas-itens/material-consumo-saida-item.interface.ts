import { MaterialConsumoSaida } from 'src/materiais-consumo-saidas/material-consumo-saida.interface';
import { MaterialConsumo } from 'src/materiais-consumo/material-consumo.interface';
import { User } from 'src/users/user.interface';

export interface MaterialConsumoSaidaItem {
  id?: number;
  material_consumo_saida: MaterialConsumoSaida;
  material_consumo: MaterialConsumo;
  quantidade: number;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type MateriaisConsumoSaidasItens = Array<MaterialConsumoSaidaItem>;
