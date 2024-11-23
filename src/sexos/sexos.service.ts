import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sexo as SexoEntity } from './sexo.entity';
import {
  Sexo as SexoInterface,
  Sexos as SexosInterface,
} from './sexo.interface';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class SexosService {
  constructor(
    @InjectRepository(SexoEntity)
    private sexoRepository: Repository<SexoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<SexosInterface> {
    return await this.sexoRepository.find();
  }

  async find(id: number): Promise<SexoInterface | null> {
    return await this.sexoRepository.findOne({ where: { id: id } });
  }

  async create(object: SexoInterface, idUser: User) {
    var object: SexoInterface = this.sexoRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.sexoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um sexo',
      tipo: 1,
      table: 'sexos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: SexoInterface, idUser: User) {
    var data: SexoInterface = await this.sexoRepository.findOneBy({ id: id });
    data = { ...object };
    await this.sexoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um sexo',
      tipo: 2,
      table: 'sexos',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.sexoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.sexoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um sexo',
      tipo: 3,
      table: 'sexos',
      fk: data.id,
      user: idUser,
    });
  }
}
