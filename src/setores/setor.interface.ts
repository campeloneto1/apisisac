import { Subunidade } from "src/subunidades/subunidade.interface";
import { User } from "src/users/user.interface";

export interface Setor{
    id?: number;
    nome: string;
    abreviatura?: string;
    telefone?: string;
    email?: string;
    subunidade: Subunidade

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Setores = Array<Setor>;