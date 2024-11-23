import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { Banco as BancoEntity } from './banco.entity';
import {
  Banco as BancoInterface,
  Bancos as BancosInterface,
} from './banco.interface';

@Injectable()
export class BancosService {
  constructor(
    @InjectRepository(BancoEntity)
    private bancoRepository: Repository<BancoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<BancosInterface> {
    return await this.bancoRepository.find();
  }

  async find(id: number): Promise<BancoInterface | null> {
    return await this.bancoRepository.findOne({ where: { id: id } });
  }

  async create(object: BancoInterface, idUser: User) {
    var object: BancoInterface = this.bancoRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.bancoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um banco',
      tipo: 1,
      table: 'bancos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: BancoInterface, idUser: User) {
    var data: BancoInterface = await this.bancoRepository.findOneBy({ id: id });
    data = { ...object };
    await this.bancoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um banco',
      tipo: 2,
      table: 'bancos',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.bancoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.bancoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um banco',
      tipo: 3,
      table: 'bancos',
      fk: data.id,
      user: idUser,
    });
  }
}
