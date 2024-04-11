import { Estado } from "src/estados/estado.interface";
import { User } from "src/users/user.interface";

export interface Cidade{
    id?: number;
    nome: string;
    abreviatura: string;
    estado: Estado

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Cidades = Array<Cidade>;