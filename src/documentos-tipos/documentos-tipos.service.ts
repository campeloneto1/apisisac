import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { DocumentoTipo as DocumentoTipoEntity } from './documento-tipo.entity';
import {
  DocumentoTipo as DocumentoTipoInterface,
  DocumentosTipos as DocumentosTiposInterface,
} from './documento-tipo.interface';

@Injectable()
export class DocumentosTiposService {
  constructor(
    @InjectRepository(DocumentoTipoEntity)
    private documentoTipoRepository: Repository<DocumentoTipoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<DocumentosTiposInterface> {
    return await this.documentoTipoRepository.find();
  }

  async find(id: number): Promise<DocumentoTipoInterface | null> {
    return await this.documentoTipoRepository.findOne({ where: { id: id } });
  }

  async create(object: DocumentoTipoInterface, idUser: User) {
    var object: DocumentoTipoInterface = this.documentoTipoRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.documentoTipoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um tipo de documento',
      tipo: 1,
      table: 'documentos_tipos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: DocumentoTipoInterface, idUser: User) {
    var data: DocumentoTipoInterface =
      await this.documentoTipoRepository.findOneBy({ id: id });
    data = { ...object };
    await this.documentoTipoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um tipo de documento',
      tipo: 2,
      table: 'documentos_tipos',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.documentoTipoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.documentoTipoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um tipo de documento',
      tipo: 3,
      table: 'documentos_tipos',
      fk: data.id,
      user: idUser,
    });
  }
}
