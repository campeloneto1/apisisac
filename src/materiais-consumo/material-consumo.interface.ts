import { MaterialConsumoTipo } from "src/materiais-consumo-tipos/material-consumo-tipo.interface";
import { Modelo } from "src/modelos/modelo.interface";
import { Subunidade } from "src/subunidades/subunidade.interface";
import { User } from "src/users/user.interface";

export interface MaterialConsumo{
    id?: number;
    subunidade: Subunidade;
    material_consumo_tipo: MaterialConsumoTipo;
    modelo: Modelo;
    serial?: string;
    data_validade?: Date;
    quantidade: number;
    quantidade_disponivel: number;
    quantidade_alerta: number;
    
    data_baixa?: Date;
    observacoes?: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisConsumo = Array<MaterialConsumo>;