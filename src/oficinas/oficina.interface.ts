import { Cidade } from "src/cidades/cidade.interface";
import { Subunidade } from "src/subunidades/subunidade.interface";
import { User } from "src/users/user.interface";

export interface Oficina{
    id?: number;
    nome: string;

    gerente?: string;
    telefone1?: string;
    telefone2?: string;
    email?: string;

    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: Cidade;
    cep?: string;

    subunidade: Subunidade;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Oficinas = Array<Oficina>;