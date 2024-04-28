import { Cor } from "src/cores/cor.interface";
import { Modelo } from "src/modelos/modelo.interface";
import { User } from "src/users/user.interface";
import { VeiculoTipo } from "src/veiculos-tipos/veiculo-tipo.interface";

export interface Veiculo{
    id?: number;
    placa: string;
    placa_especial?: string;
    renavam?: string;
    chassi?: string;
    ano?: number;
    blindado?: boolean;
    organico?: boolean;

    km_inicial: number;
    km_atual:number;
    km_troca_oleo?: number;

    veiculo_tipo: VeiculoTipo;
    modelo: Modelo;
    cor: Cor;

    observacoes?: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Veiculos = Array<Veiculo>;