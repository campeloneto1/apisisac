import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { In, IsNull, Repository } from 'typeorm';
import { Patrimonio as PatrimonioEntity } from './patrimonio.entity';
import {
  Patrimonio as PatrimonioInterface,
  Patrimonios as PatrimoniosInterface,
} from './patrimonio.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class PatrimoniosService {
  constructor(
    @InjectRepository(PatrimonioEntity)
    private patrimonioRepository: Repository<PatrimonioEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(params: any, idUser: User): Promise<PatrimoniosInterface> {
    return await this.patrimonioRepository.find({
      where: {
        //@ts-ignore
        setor: {
          subunidade: {
            id: params.subunidade,
          },
        },
      },
    });
  }

  async find(id: number, idUser: User): Promise<PatrimonioInterface | null> {
    var idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.patrimonioRepository.findOne({
      where: {
        id: id,
        //@ts-ignore
        setor: {
          subunidade: {
            id: In(idsSubs),
          },
        },
      },
    });
  }

  async create(object: PatrimonioInterface, idUser: User) {
    var object: PatrimonioInterface = this.patrimonioRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.patrimonioRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um Patrimonio',
      tipo: 1,
      table: 'patrimonios',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: PatrimonioInterface, idUser: User) {
    var data: PatrimonioInterface = await this.patrimonioRepository.findOneBy({
      id: id,
    });
    data = { ...object };
    await this.patrimonioRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um Patrimonio',
      tipo: 2,
      table: 'patrimonios',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.patrimonioRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.patrimonioRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um Patrimonio',
      tipo: 3,
      table: 'patrimonios',
      fk: data.id,
      user: idUser,
    });
  }

  async disponiveis(params: any, idUser: User): Promise<PatrimoniosInterface> {
    return await this.patrimonioRepository.find({
      where: {
        data_baixa: IsNull(),
        //@ts-ignore
        setor: {
          subunidade: {
            id: params.subunidade,
          },
        },
      },
    });
  }

  async relatorio(object: any, idUser: User): Promise<PatrimoniosInterface> {
    var patrimonios;

    patrimonios = await this.patrimonioRepository.find({
      where: {
        //@ts-ignore
        setor: {
          subunidade: {
            id: object.subunidade,
          },
        },
      },
      order: {
        tombo: 'ASC',
      },
    });

    if (object.data_baixa) {
      patrimonios = patrimonios.filter((element) => {
        return element.data_baixa !== null;
      });
    }

    if (object.setor) {
      patrimonios = patrimonios.filter((element) => {
        return element.setor.id === object.setor;
      });
    }

    if (object.patrimonio_tipo) {
      patrimonios = patrimonios.filter((element) => {
        return element.patrimonio_tipo.id === object.patrimonio_tipo;
      });
    }

    return patrimonios;
  }
}
