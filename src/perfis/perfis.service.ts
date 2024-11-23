import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { Perfil as PerfilEntity } from './perfil.entity';
import {
  Perfil as PerfilInterface,
  Perfis as PerfisInterface,
} from './perfil.interface';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class PerfisService {
  constructor(
    @InjectRepository(PerfilEntity)
    private perfilRepository: Repository<PerfilEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<PerfisInterface> {
    return await this.perfilRepository.find();
  }

  async find(id: number): Promise<PerfilInterface | null> {
    return await this.perfilRepository.findOne({ where: { id: id } });
  }

  async create(object: PerfilInterface, idUser: User) {
    var object: PerfilInterface = this.perfilRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.perfilRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um perfil',
      tipo: 1,
      table: 'perfis',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: PerfilInterface, idUser: User) {
    var data: PerfilInterface = await this.perfilRepository.findOneBy({
      id: id,
    });
    data = { ...object };
    await this.perfilRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um perfil',
      tipo: 2,
      table: 'perfis',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.perfilRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.perfilRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um perfil',
      tipo: 3,
      table: 'perfis',
      fk: data.id,
      user: idUser,
    });
  }
}
