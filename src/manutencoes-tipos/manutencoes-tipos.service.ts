import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ManutencaoTipo as ManutencaoTipoEntity } from './manutencao-tipo.entity';
import {
  ManutencaoTipo as ManutencaoTipoInterface,
  ManutencoesTipos as ManutencoesTiposInterface,
} from './manutencao-tipo.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class ManutencoesTiposService {
  constructor(
    @InjectRepository(ManutencaoTipoEntity)
    private manutencaoTipoRepository: Repository<ManutencaoTipoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<ManutencoesTiposInterface> {
    return await this.manutencaoTipoRepository.find();
  }

  async find(id: number): Promise<ManutencaoTipoInterface | null> {
    return await this.manutencaoTipoRepository.findOne({ where: { id: id } });
  }

  async create(object: ManutencaoTipoInterface, idUser: User) {
    var object: ManutencaoTipoInterface = this.manutencaoTipoRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.manutencaoTipoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um tipo de manutenção',
      tipo: 1,
      table: 'manutencoes_tipos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: ManutencaoTipoInterface, idUser: User) {
    var data: ManutencaoTipoInterface =
      await this.manutencaoTipoRepository.findOneBy({ id: id });
    data = { ...object };
    await this.manutencaoTipoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um tipo de manutenção',
      tipo: 2,
      table: 'manutencoes_tipos',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.manutencaoTipoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.manutencaoTipoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um tipo de manutenção',
      tipo: 3,
      table: 'manutencoes_tipos',
      fk: data.id,
      user: idUser,
    });
  }
}
