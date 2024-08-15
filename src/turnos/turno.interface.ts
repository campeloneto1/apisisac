import { Subunidade } from "src/subunidades/subunidade.interface";
import { User } from "src/users/user.interface";

export interface Turno{
    id?: number;
    nome: string;
    abreviatura: string;
    subunidade: Subunidade;
    hora_inicio: Date;
    hora_fim: Date;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Turnos = Array<Turno>;