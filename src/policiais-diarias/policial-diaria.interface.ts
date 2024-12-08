import { Cidade } from 'src/cidades/cidade.interface';
import { DiariaStatus } from 'src/diarias-status/diaria-status.interface';
import { DiariaTipo } from 'src/diarias-tipos/diaria-tipo.interface';
import { Policial } from 'src/policiais/policial.interface';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { User } from 'src/users/user.interface';

export interface PolicialDiaria {
  id?: number;
  subunidade: Subunidade;
  policial: Policial;
  data_inicial: Date;
  data_final?: Date;
  cidade: Cidade;
  quant_diarias?: number;
  valor?: number;
  acrescimo?: number;
  ajuda_custo?: number;
  valor_total?: number;
  observacoes?: string;
  doe?: string;
  nup?: string;
  diaria_status: DiariaStatus;
  diaria_tipo: DiariaTipo;
  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type PoliciaisDiarias = Array<PolicialDiaria>;
