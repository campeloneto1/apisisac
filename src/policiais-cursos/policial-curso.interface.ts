import { Curso } from "src/cursos/curso.interface";
import { Policial } from "src/policiais/policial.interface";
import { User } from "src/users/user.interface";

export interface PolicialCurso{
    id?: number;
    curso: Curso;
    policial: Policial;
    carga_horaria?: number;
    data_inicial: Date;
    data_final: Date;
    boletim?: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type PoliciaisCursos = Array<PolicialCurso>;