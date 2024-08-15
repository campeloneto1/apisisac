import { Subunidade } from "src/subunidades/subunidade.interface";
import { User } from "src/users/user.interface";

export interface EscalaTipo{
    id?: number;
    nome: string;
    abreviatura: string;
    subunidade: Subunidade;
    ativo: boolean;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type EscalasTipos = Array<EscalaTipo>;