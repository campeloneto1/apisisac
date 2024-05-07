import { MateriaisConsumoSaidasItens } from "src/materiais-consumo-saidas-itens/material-consumo-saida-item.interface";
import { Subunidade } from "src/subunidades/subunidade.interface";
import { User } from "src/users/user.interface";

export interface MaterialConsumoSaida{
    id?: number;
    subunidade: Subunidade;
    user: User;
    data_saida: Date;
    observacoes? : string;
    materiais_consumo_saidas_itens: MateriaisConsumoSaidasItens;
    materiais_consumo?: any;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisConsumoSaidas = Array<MaterialConsumoSaida>;