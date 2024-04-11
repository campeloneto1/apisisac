import { Cidade } from "src/cidades/cidade.interface";
import { Graduacao } from "src/graduacoes/graduacao.interface";
import { Setor } from "src/setores/setor.interface";
import { Sexo } from "src/sexos/sexo.interface";
import { User } from "src/users/user.interface";

export interface Policial{
    id?: number;
    nome: string;
    numeral?: string;
    nome_guerra: string;
    matricula: string;
    cpf: string;
    email?: string;
    telefone1?: string;
    telefone2?: string;
    data_nascimento?: Date;

    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: Cidade;
    cep?: string;

    data_ingresso?: Date;
    boletim_inclusao?: string;
    data_apresentacao?: Date;
    boletim_apresentacao?: string;
    boletim_transferencia?: string;

    sexo?: Sexo;
    graduacao: Graduacao;
    setor: Setor;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;

}

export type Policiais = Array<Policial>;