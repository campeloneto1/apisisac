import { User } from "src/users/user.interface";

export interface DocumentoTipo{
    id?: number;
    nome: string;
    abreviatura: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type DocumentosTipos = Array<DocumentoTipo>;