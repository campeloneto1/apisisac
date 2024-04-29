import { Cidade } from "src/cidades/cidade.entity";
import { Policial } from "src/policiais/policial.entity";
import { Subunidade } from "src/subunidades/subunidade.entity";
import { User } from "src/users/user.interface";
import { Veiculo } from "src/veiculos/veiculo.entity";

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

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type VeiculosPoliciais = Array<VeiculoPolicial>;