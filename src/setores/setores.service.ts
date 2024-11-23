import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setor as SetorEntity } from './setor.entity';
import {
  Setor as SetorInterface,
  Setores as SetoresInterface,
} from './setor.interface';
import { Policiais as PoliciaisInterface } from 'src/policiais/policial.interface';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';
import { PoliciaisService } from 'src/policiais/policiais.service';

@Injectable()
export class SetoresService {
  constructor(
    @InjectRepository(SetorEntity)
    private setorRepository: Repository<SetorEntity>,
    private logsService: LogsService,
    private policiaisService: PoliciaisService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(params: any, idUser: User): Promise<SetoresInterface> {
    if (idUser.perfil.administrador) {
      return await this.setorRepository.find();
    } else {
      return await this.setorRepository.find({
        where: {
          //@ts-ignore
          subunidade: {
            id: params.subunidade,
          },
        },
      });
    }
  }

  async find(id: number): Promise<SetorInterface | null> {
    return await this.setorRepository.findOne({ where: { id: id } });
  }

  async create(object: SetorInterface, idUser: User) {
    const object2: SetorInterface = this.setorRepository.create({
      ...object,
      created_by: idUser,
    });
    const save = await this.setorRepository.save(object2);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um setor',
      tipo: 1,
      table: 'setores',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: SetorInterface, idUser: User) {
    let data: SetorInterface = await this.setorRepository.findOneBy({ id: id });
    data = { ...object };
    await this.setorRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um setor',
      tipo: 2,
      table: 'setores',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    const data = await this.setorRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.setorRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um setor',
      tipo: 3,
      table: 'setores',
      fk: data.id,
      user: idUser,
    });
  }

  async whereSubunidade(id: number): Promise<SetoresInterface | null> {
    return await this.setorRepository.find({
      where: {
        subunidade: {
          id: id,
        },
      },
    });
  }

  async gePoliciais(
    id: number,
    params: any,
    idUser: User,
  ): Promise<PoliciaisInterface | null> {
    return await this.policiaisService.porSetor(id, params, idUser);
  }

  async policiaisSetor(params: any, idUser: User): Promise<any> {
    return await this.setorRepository.query(`
            SELECT setores.nome, count(policiais.id) as quantidade
            FROM setores
            LEFT JOIN policiais ON setores.id = policiais.setorId
            WHERE policiais.boletim_transferencia IS NULL
            AND setores.subunidadeId = ${params.subunidade}
            GROUP BY setores.nome
            ORDER BY setores.nome
          `);
  }
}
