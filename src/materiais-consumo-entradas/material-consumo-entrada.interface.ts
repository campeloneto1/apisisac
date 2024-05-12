import { MateriaisConsumoEntradasItens } from "src/materiais-consumo-entradas-itens/material-consumo-entrada-item.interface";
import { Subunidade } from "src/subunidades/subunidade.interface";
import { User } from "src/users/user.interface";

export interface MaterialConsumoEntrada{
    id?: number;
    subunidade: Subunidade;
    user: User;
    data_entrada: Date;
    observacoes? : string;
    materiais_consumo_entradas_itens: MateriaisConsumoEntradasItens;
    materiais?: any;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisConsumoEntradas = Array<MaterialConsumoEntrada>;