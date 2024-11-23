import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { VeiculoTipo as VeiculoTipoEntity } from './veiculo-tipo.entity';
import {
  VeiculoTipo as VeiculoTipoInterface,
  VeiculosTipos as VeiculosTiposInterface,
} from './veiculo-tipo.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class VeiculosTiposService {
  constructor(
    @InjectRepository(VeiculoTipoEntity)
    private veiculoTipoRepository: Repository<VeiculoTipoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<VeiculosTiposInterface> {
    return await this.veiculoTipoRepository.find();
  }

  async find(id: number): Promise<VeiculoTipoInterface | null> {
    return await this.veiculoTipoRepository.findOne({ where: { id: id } });
  }

  async create(object: VeiculoTipoInterface, idUser: User) {
    var object: VeiculoTipoInterface = this.veiculoTipoRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.veiculoTipoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um tipo de veículo',
      tipo: 1,
      table: 'veiculos_tipos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: VeiculoTipoInterface, idUser: User) {
    var data: VeiculoTipoInterface = await this.veiculoTipoRepository.findOneBy(
      { id: id },
    );
    data = { ...object };
    await this.veiculoTipoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um tipo de veículo',
      tipo: 2,
      table: 'veiculos_tipos',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.veiculoTipoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.veiculoTipoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um tipo de veículo',
      tipo: 3,
      table: 'veiculos_tipos',
      fk: data.id,
      user: idUser,
    });
  }
}
