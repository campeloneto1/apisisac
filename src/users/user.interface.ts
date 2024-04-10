export interface User{
    id?: number;
    nome: string;
    telefone?: string;
    email?: string;
    cpf: string;
    password: string;
    salt: string;
}

export type Users = Array<User>;