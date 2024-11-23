import { Cidade } from 'src/cidades/cidade.interface';
import { Subunidade } from 'src/subunidades/subunidade.interface';
import { User } from 'src/users/user.entity';

export interface Empresa {
  id?: number;
  subunidade: Subunidade;
  nome: string;
  nome_fantasia?: string;
  cnpj: string;
  telefone1?: string;
  telefone2?: string;
  email?: string;
  gerente?: string;

  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: Cidade;
  cep?: string;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type Empresas = Array<Empresa>;
