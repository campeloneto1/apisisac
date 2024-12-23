import { Cor } from 'src/cores/cor.interface';
import { Modelo } from 'src/modelos/modelo.interface';
import { User } from 'src/users/user.interface';
import { VeiculoTipo } from 'src/veiculos-tipos/veiculo-tipo.interface';

export interface Veiculo {
  id?: number;
  placa: string;
  placa_especial?: string;
  renavam?: string;
  chassi?: string;
  ano?: string;
  blindado?: boolean;
  organico?: boolean;
  data_baixa?: Date;

  disponivel_viagem?: boolean;
  cautela?: boolean;

  km_inicial: number;
  km_atual: number;
  km_troca_oleo?: number;
  km_revisao?: number;
  data_revisao?: Date;

  veiculo_tipo: VeiculoTipo;
  modelo: Modelo;
  cor: Cor;

  nao_disponivel?: boolean;

  observacoes?: string;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type Veiculos = Array<Veiculo>;
