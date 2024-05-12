import { MaterialPolicial } from "src/materiais-policiais/material-policial.interface";
import { Material } from "src/materiais/material.interface";
import { User } from "src/users/user.interface";

export interface MaterialPolicialItem {
    id?: number;
    material_policial: MaterialPolicial;
    material: Material;
    quantidade: number;
    quantidade_devolucao?: number;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisPoliciaisItens = Array<MaterialPolicialItem>;