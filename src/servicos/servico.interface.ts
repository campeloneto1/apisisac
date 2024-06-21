import { Empresa } from "src/empresas/empresa.interface";
import { ServicoTipo } from "src/servicos-tipos/servico-tipo.interface";
import { Subunidade } from "src/subunidades/subunidade.entity";
import { User } from "src/users/user.interface";

export interface Servico{
    id?: number;
    subunidade: Subunidade;
    empresa: Empresa;
    servico_tipo: ServicoTipo;
    data_inicial: Date;
    data_final: Date;
    observacoes: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Servicos = Array<Servico>;