import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cidade as CidadeEntity } from './cidade.entity';
import { Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import {
  Cidade as CidadeInterface,
  Cidades as CidadesInterface,
} from './cidade.interface';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class CidadesService {
  constructor(
    @InjectRepository(CidadeEntity)
    private cidadeRepository: Repository<CidadeEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<CidadesInterface> {
    return await this.cidadeRepository.find();
  }

  async find(id: number): Promise<CidadeInterface | null> {
    return await this.cidadeRepository.findOne({ where: { id: id } });
  }

  async create(object: CidadeInterface, idUser: User) {
    var object: CidadeInterface = this.cidadeRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.cidadeRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou uma cidade',
      tipo: 1,
      table: 'cidades',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: CidadeInterface, idUser: User) {
    var data: CidadeInterface = await this.cidadeRepository.findOneBy({
      id: id,
    });
    data = { ...object };
    await this.cidadeRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou uma cidade',
      tipo: 2,
      table: 'cidades',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.cidadeRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.cidadeRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma cidade',
      tipo: 3,
      table: 'cidades',
      fk: data.id,
      user: idUser,
    });
  }

  async whereEstado(id: number): Promise<CidadesInterface | null> {
    return await this.cidadeRepository.find({
      where: {
        estado: {
          id: id,
        },
      },
    });
  }
}
