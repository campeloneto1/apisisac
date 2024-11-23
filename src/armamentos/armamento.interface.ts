import { ArmamentoCalibre } from 'src/armamentos-calibres/armamento-calibre.interface';
import { ArmamentoTamanho } from 'src/armamentos-tamanhos/armamento-tamanho.interface';
import { ArmamentoTipo } from 'src/armamentos-tipos/armamento-tipo.interface';
import { Modelo } from 'src/modelos/modelo.interface';
import { Subunidade } from 'src/subunidades/subunidade.interface';
import { User } from 'src/users/user.interface';

export interface Armamento {
  id?: number;
  subunidade: Subunidade;
  serial: string;
  modelo: Modelo;
  armamento_tipo: ArmamentoTipo;
  armamento_calibre?: ArmamentoCalibre;
  armamento_tamanho?: ArmamentoTamanho;
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

export type Armamentos = Array<Armamento>;
