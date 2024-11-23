import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Not, Repository } from 'typeorm';
import { Documento as DocumentoEntity } from './documento.entity';
import {
  Documento as DocumentoInterface,
  Documentos as DocumentosInterface,
} from './documento.interface';
import { format } from 'date-fns';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(DocumentoEntity)
    private documentoRepository: Repository<DocumentoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<DocumentosInterface> {
    return await this.documentoRepository.find();
  }

  async find(id: number): Promise<DocumentoInterface | null> {
    return await this.documentoRepository.findOne({ where: { id: id } });
  }

  async create(object: DocumentoInterface, idUser: User) {
    var hj = new Date();
    var quant: number = await this.documentoRepository.count({
      where: {
        //@ts-ignore
        documento_tipo: {
          id: object.documento_tipo,
        },
      },
    });
    quant++;
    var cod = `${quant}/${format(hj, 'yyyy')}`;
    var object: DocumentoInterface = this.documentoRepository.create({
      ...object,
      codigo: cod,
      setor: idUser.policial.setor,
      created_by: idUser,
    });
    var save = await this.documentoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um documento',
      tipo: 1,
      table: 'documentos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: DocumentoInterface, idUser: User) {
    var data: DocumentoInterface = await this.documentoRepository.findOneBy({
      id: id,
    });

    //@ts-ignore
    if (object.documento_tipo != data.documento_tipo.id) {
      var hj = new Date();
      var quant: number = await this.documentoRepository.count({
        where: {
          //@ts-ignore
          documento_tipo: {
            id: object.documento_tipo,
          },
        },
      });
      quant++;
      var cod = `${quant}/${format(hj, 'yyyy')}`;
      data = { ...object, codigo: cod };
    } else {
      data = { ...object };
    }
    await this.documentoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );

    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um documento',
      tipo: 2,
      table: 'documentos',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.documentoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.documentoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um documento',
      tipo: 3,
      table: 'documentos',
      fk: data.id,
      user: idUser,
    });
  }
}
