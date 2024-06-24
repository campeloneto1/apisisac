import { User } from "src/users/user.interface";
import { VeiculoPolicial } from "src/veiculos-policiais/veiculo-policial.entity";

export interface VeiculoPolicialAlteracao{
    id?: number;
    veiculo_policial: VeiculoPolicial;
    foto: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}