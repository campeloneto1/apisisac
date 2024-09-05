import { AfastamentoTipo } from "src/afastamentos-tipos/afastamento-tipo.interface";
import { Policial } from "src/policiais/policial.interface";
import { User } from "src/users/user.interface";

export interface PolicialAtestado{
    id?: number;
    policial: Policial;
    data_inicial: Date;
    data_final: Date;
    dias: number;
    cid?: string;
    hospital?: string;
    crm?: string;
    afastamento_tipo: AfastamentoTipo;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type PoliciaisAtestados = Array<PolicialAtestado>;