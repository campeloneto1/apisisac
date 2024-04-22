import { Perfil } from "src/perfis/perfil.interface";
import { Subunidade } from "src/subunidades/subunidade.interface";

export interface User{
    id?: number;
    nome: string;
    telefone?: string;
    email?: string;
    cpf: string;
    password: string;
    salt: string;
    perfil: Perfil;
    subunidade: Subunidade;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Users = Array<User>;