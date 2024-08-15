import { Posto } from "src/postos/posto.interface";
import { Turno } from "src/turnos/turno.interface";
import { User } from "src/users/user.interface";

export interface PostoTurno{
    id?: number;
    posto: Posto;
    turno: Turno;
    ordem?: number;
    ativo: boolean;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type PostosTurnos = Array<PostoTurno>;