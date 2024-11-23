import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca as MarcaEntity } from './marca.entity';
import {
  Marca as MarcaInterface,
  Marcas as MarcasInterface,
} from './marca.interface';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(MarcaEntity)
    private marcaRepository: Repository<MarcaEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<MarcasInterface> {
    return await this.marcaRepository.find();
  }

  async find(id: number): Promise<MarcaInterface | null> {
    return await this.marcaRepository.findOne({ where: { id: id } });
  }

  async create(object: MarcaInterface, idUser: User) {
    var object: MarcaInterface = this.marcaRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.marcaRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou uma marca',
      tipo: 1,
      table: 'marcas',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: MarcaInterface, idUser: User) {
    var data: MarcaInterface = await this.marcaRepository.findOneBy({ id: id });
    data = { ...object };
    await this.marcaRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou uma marca',
      tipo: 2,
      table: 'marcas',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.marcaRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.marcaRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma marca',
      tipo: 3,
      table: 'marcas',
      fk: data.id,
      user: idUser,
    });
  }

  async marcasArmamentos(): Promise<MarcasInterface> {
    return await this.marcaRepository.find({ where: { armamento: true } });
  }

  async marcasLogistica(): Promise<MarcasInterface> {
    return await this.marcaRepository.find({ where: { logistica: true } });
  }

  async marcasTransporte(): Promise<MarcasInterface> {
    return await this.marcaRepository.find({ where: { transporte: true } });
  }
}
