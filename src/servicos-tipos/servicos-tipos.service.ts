import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { ServicoTipo as ServicoTipoEntity } from './servico-tipo.entity';
import {
  ServicoTipo as ServicoTipoInterface,
  ServicosTipos as ServicosTiposInterface,
} from './servico-tipo.interface';

@Injectable()
export class ServicosTiposService {
  constructor(
    @InjectRepository(ServicoTipoEntity)
    private sexoRepository: Repository<ServicoTipoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<ServicosTiposInterface> {
    return await this.sexoRepository.find();
  }

  async find(id: number): Promise<ServicoTipoInterface | null> {
    return await this.sexoRepository.findOne({ where: { id: id } });
  }

  async create(object: ServicoTipoInterface, idUser: User) {
    var object: ServicoTipoInterface = this.sexoRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.sexoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um tipo de serviço',
      tipo: 1,
      table: 'servicos_tipos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: ServicoTipoInterface, idUser: User) {
    var data: ServicoTipoInterface = await this.sexoRepository.findOneBy({
      id: id,
    });
    data = { ...object };
    await this.sexoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um tipo de serviço',
      tipo: 2,
      table: 'servicos_tipos',
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
      mensagem: 'Excluiu um tipo de serviço',
      tipo: 3,
      table: 'servicos_tipos',
      fk: data.id,
      user: idUser,
    });
  }
}
