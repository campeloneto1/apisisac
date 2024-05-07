import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado as EstadoEntity } from './estado.entity';
import {
  Estado as EstadoInterface,
  Estados as EstadosInterface,
} from './estado.interface';
import { Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class EstadosService {
  constructor(
    @InjectRepository(EstadoEntity)
    private estadoRepository: Repository<EstadoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<EstadosInterface> {
    return await this.estadoRepository.find();
  }

  async find(id: number): Promise<EstadoInterface | null> {
    return await this.estadoRepository.findOne({ where: { id: id } });
  }

  async create(object: EstadoInterface, idUser: User) {
    var object: EstadoInterface = this.estadoRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.estadoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um estado',
      tipo: 1,
      table: 'estados',
      fk: save.id,
      user: idUser
    });
  }

  async update(id: number, object: EstadoInterface, idUser: User) {
    var data: EstadoInterface = await this.estadoRepository.findOneBy({
      id: id,
    });
    data = { ...object };
    await this.estadoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );

    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um estado',
      tipo: 2,
      table: 'estados',
      fk: id,
      user: idUser
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.estadoRepository.findOne({where: {
      id: id,
    }});
    await this.estadoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um estado',
      tipo: 3,
      table: 'estados',
      fk: data.id,
      user: idUser
    });
  }

  async wherePais(id: number): Promise<EstadosInterface | null> {
    return await this.estadoRepository.find({
      where: {
        pais: {
          id: id,
        },
      },
    });
  }
}
