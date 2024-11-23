import { DocumentoTipo } from 'src/documentos-tipos/documento-tipo.interface';
import { Setor } from 'src/setores/setor.interface';
import { User } from 'src/users/user.interface';

export interface Documento {
  id?: number;
  codigo: string;
  titulo: string;
  texto: string;
  documento_tipo?: DocumentoTipo;
  setor: Setor;

  created_by: User;
  updated_by: User;
  created_at: Date;
  updated_at: Date;
}

export type Documentos = Array<Documento>;
