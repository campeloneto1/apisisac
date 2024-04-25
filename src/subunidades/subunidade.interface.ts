import { Cidade } from "src/cidades/cidade.interface";
import { Policial } from "src/policiais/policial.interface";
import { Unidade } from "src/unidades/unidade.interface";
import { User } from "src/users/user.interface";

export interface Subunidade{
    id?: number;
    nome: string;
    abreviatura: string;
    telefone?: string;
    email?: string;
    unidade: Unidade;

    comandante?: Policial;
    subcomandante?: Policial;

    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: Cidade;
    cep?: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Subunidades = Array<Subunidade>;