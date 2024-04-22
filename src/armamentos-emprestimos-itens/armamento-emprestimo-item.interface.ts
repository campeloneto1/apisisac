import { ArmamentoEmprestimo } from "src/armamentos-emprestimos/armamento-emprestimo.interface";
import { Armamento } from "src/armamentos/armamento.interface";
import { User } from "src/users/user.interface";

export interface ArmamentoEmprestimoItem {
    id?: number;
    armamento_emprestimo: ArmamentoEmprestimo;
    armamento: Armamento;
    quantidade: number;
    quantidade_devolucao?: number;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type ArmamentosEmprestimosItens = Array<ArmamentoEmprestimoItem>;