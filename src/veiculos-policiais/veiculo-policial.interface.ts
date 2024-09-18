import { Cidade } from "src/cidades/cidade.interface";
import { Policial } from "src/policiais/policial.interface";
import { Subunidade } from "src/subunidades/subunidade.interface";
import { User } from "src/users/user.interface";
import { VeiculosPoliciaisAlteracoes } from "src/veiculos-policiais-alteracoes/veiculo-policial-alteracao.interface";
import { Veiculo } from "src/veiculos/veiculo.interface";

export interface VeiculoPolicial{
    id?: number;
    policial: Policial;
    veiculo: Veiculo;
    km_inicial: number;
    km_final?: number;
    data_inicial: Date;
    data_final?: Date;
    observacoes?: string;
    cidade?: Cidade;
    subunidade: Subunidade;
    veiculos_policiais_alteracoes?: VeiculosPoliciaisAlteracoes;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type VeiculosPoliciais = Array<VeiculoPolicial>;