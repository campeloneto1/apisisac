import { ContratoObjeto } from "src/contratos-objetos/contrato-objeto.interface";
import { ContratoTipo } from "src/contratos-tipos/contrato-tipo.interface";
import { Empresa } from "src/empresas/empresa.interface";
import { Policial } from "src/policiais/policial.interface";
import { Subunidade } from "src/subunidades/subunidade.interface";
import { User } from "src/users/user.interface";

export interface Contrato{
    id?: number;
    subunidade: Subunidade;
    empresa: Empresa;
    numero_contrato: string;
    numero_sacc: string;
    valor_global: number;
    prazo_vigencia: Date;
    prorrogavel?: boolean;

    contrato_tipo: ContratoTipo;
    contrato_objeto: ContratoObjeto;

    gestor: Policial;
    fiscal: Policial;

    observacoes?: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Contratos = Array<Contrato>;