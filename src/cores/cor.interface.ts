import { User } from "src/users/user.interface";

export interface Cor{
    id?: number;
    nome: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Cores = Array<Cor>;