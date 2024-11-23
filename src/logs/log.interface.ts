import { User } from 'src/users/user.interface';

export interface Log {
  id?: number;
  object: string;
  object_old?: string;
  mensagem: string;
  tipo: number;
  table: string;
  fk: number;
  user: User;
}

export type Logs = Array<Log>;
