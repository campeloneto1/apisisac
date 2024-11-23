import { ContratosLancamentos } from 'src/contratos-lancamentos/contrato-lancamento.interface';
import { ContratoObjeto } from 'src/contratos-objetos/contrato-objeto.interface';
import { ContratoTipo } from 'src/contratos-tipos/contrato-tipo.interface';
import { Empresa } from 'src/empresas/empresa.interface';
import { Policial } from 'src/policiais/policial.interface';
import { Subunidade } from 'src/subunidades/subunidade.interface';
import { User } from 'src/users/user.interface';

export interface Contrato {
  id?: number;
  subunidade: Subunidade;
  empresa: Empresa;
  numero_contrato: string;
  numero_sacc: string;
  valor_global: number;
  valor_usado: number;
  data_inicial: Date;
  data_final: Date;
  prorrogavel?: boolean;
  objeto: string;
  contrato_tipo: ContratoTipo;
  contrato_objeto: ContratoObjeto;

  gestor: Policial;
  fiscal: Policial;

  quantidade_diarias?: number;
  numero_porrogacao?: number;
  contrato_prorrogado?: Contrato;
  porcentagem_aditivado?: number;
  data_aditivado?: Date;
  observacoes_aditivado?: string;

  observacoes?: string;

  contratos_lancamentos: ContratosLancamentos;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type Contratos = Array<Contrato>;
