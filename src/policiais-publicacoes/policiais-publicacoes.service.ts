import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { In, IsNull, Repository } from 'typeorm';
import { PolicialPublicacao as PolicialPublicacaoEntity } from './policial-publicacao.entity';
import {
  PolicialPublicacao as PolicialPublicacaoInterface,
  PoliciaisPublicacoes as PoliciaisPublicacoesInterface,
} from './policial-publicacao.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class PoliciaisPublicacoesService {
  constructor(
    @InjectRepository(PolicialPublicacaoEntity)
    private policialFeriasRepository: Repository<PolicialPublicacaoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(
    params: any,
    idUser: User,
  ): Promise<PoliciaisPublicacoesInterface> {
    if (idUser.perfil.administrador) {
      return await this.policialFeriasRepository.find({
        relations: {
          policial: {
            graduacao: true,
            setor: {
              subunidade: {
                unidade: true,
              },
            },
          },
        },
        where: {
          //@ts-ignore
          policial: {
            setor: {
              subunidade: {
                id: params.subunidade,
              },
            },
          },
        },
      });
    } else {
      return await this.policialFeriasRepository.find({
        relations: {
          policial: {
            graduacao: true,
            setor: {
              subunidade: {
                unidade: true,
              },
            },
          },
        },
        where: {
          //@ts-ignore
          policial: {
            boletim_transferencia: IsNull(),
            setor: {
              subunidade: {
                id: params.subunidade,
              },
            },
          },
        },
      });
    }
  }

  async find(
    id: number,
    idUser: User,
  ): Promise<PolicialPublicacaoInterface | null> {
    var idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.policialFeriasRepository.findOne({
      relations: {
        policial: {
          graduacao: true,
          setor: {
            subunidade: {
              unidade: true,
            },
          },
        },
      },
      where: {
        id: id,
        //@ts-ignore
        policial: {
          setor: {
            subunidade: {
              id: In(idsSubs),
            },
          },
        },
      },
    });
  }

  async create(object: PolicialPublicacaoInterface, idUser: User) {
    const object2: PolicialPublicacaoInterface =
      this.policialFeriasRepository.create({ ...object, created_by: idUser });
    const save = await this.policialFeriasRepository.save(object2);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou uma Publicacao de Policial',
      tipo: 1,
      table: 'policiais_publicacoes',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: PolicialPublicacaoInterface, idUser: User) {
    let data: PolicialPublicacaoInterface =
      await this.policialFeriasRepository.findOneBy({ id: id });
    data = { ...object };
    await this.policialFeriasRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou uma Publicacao de Policial',
      tipo: 2,
      table: 'policiais_publicacoes',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    const data = await this.policialFeriasRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.policialFeriasRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma Publicacao de Policial',
      tipo: 3,
      table: 'policiais_publicacoes',
      fk: data.id,
      user: idUser,
    });
  }

  async wherePolicial(
    id: number,
    idUser: User,
  ): Promise<PoliciaisPublicacoesInterface | null> {
    const idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.policialFeriasRepository.find({
      where: {
        //@ts-ignore
        policial: {
          id: id,
          setor: {
            subunidade: {
              id: In(idsSubs),
            },
          },
        },
      },
    });
  }
}
