import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ContratoTipo as ContratoTipoEntity } from './contrato-tipo.entity';
import {
  ContratoTipo as ContratoTipoInterface,
  ContratosTipos as ContratosTiposInterface,
} from './contrato-tipo.interface';

@Injectable()
export class ContratosTiposService {
  constructor(
    @InjectRepository(ContratoTipoEntity)
    private contratoTipoRepository: Repository<ContratoTipoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<ContratosTiposInterface> {
    return await this.contratoTipoRepository.find();
  }

  async find(id: number): Promise<ContratoTipoInterface | null> {
    return await this.contratoTipoRepository.findOne({ where: { id: id } });
  }

  async create(object: ContratoTipoInterface, idUser: User) {
    var object: ContratoTipoInterface = this.contratoTipoRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.contratoTipoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um tipo de contrato',
      tipo: 1,
      table: 'contratos_tipos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: ContratoTipoInterface, idUser: User) {
    var data: ContratoTipoInterface =
      await this.contratoTipoRepository.findOneBy({ id: id });
    data = { ...object };
    await this.contratoTipoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um tipo de contrato',
      tipo: 2,
      table: 'contratos_tipos',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.contratoTipoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.contratoTipoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um tipo de contrato',
      tipo: 3,
      table: 'contratos_tipos',
      fk: data.id,
      user: idUser,
    });
  }
}
