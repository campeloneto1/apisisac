import { MaterialConsumoEntrada } from "src/materiais-consumo-entradas/material-consumo-entrada.interface";
import { MaterialConsumo } from "src/materiais-consumo/material-consumo.interface";
import { User } from "src/users/user.interface";

export interface MaterialConsumoEntradaItem {
    id?: number;
    material_consumo_entrada: MaterialConsumoEntrada;
    material_consumo: MaterialConsumo;
    quantidade: number;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisConsumoEntradasItens = Array<MaterialConsumoEntradaItem>;