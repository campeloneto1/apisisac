import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { Funcao as FuncaoEntity } from './funcao.entity';
import {
  Funcao as FuncaoInterface,
  Funcoes as FuncoesInterface,
} from './funcao.interface';
@Injectable()
export class FuncoesService {
  constructor(
    @InjectRepository(FuncaoEntity)
    private funcaoRepository: Repository<FuncaoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<FuncoesInterface> {
    return await this.funcaoRepository.find();
  }

  async find(id: number): Promise<FuncaoInterface | null> {
    return await this.funcaoRepository.findOne({ where: { id: id } });
  }

  async create(object: FuncaoInterface, idUser: User) {
    var object: FuncaoInterface = this.funcaoRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.funcaoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou uma função',
      tipo: 1,
      table: 'funcoes',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: FuncaoInterface, idUser: User) {
    var data: FuncaoInterface = await this.funcaoRepository.findOneBy({
      id: id,
    });
    data = { ...object };
    await this.funcaoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou uma função',
      tipo: 2,
      table: 'funcoes',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.funcaoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.funcaoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma função',
      tipo: 3,
      table: 'funcoes',
      fk: data.id,
      user: idUser,
    });
  }
}
