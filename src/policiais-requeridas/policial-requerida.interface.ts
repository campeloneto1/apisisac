import { Policial } from "src/policiais/policial.interface";
import { User } from "src/users/user.interface";

export interface PolicialRequerida{
    id?: number;
    policial: Policial;
    nup: string;
    boletim_entrada?: string;
    boletim_publicacao?: string;
    data: Date;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type PoliciaisRequeridas = Array<PolicialRequerida>;