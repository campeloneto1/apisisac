import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { In, IsNull, Repository } from 'typeorm';
import { PolicialRequerida as PolicialRequeridaEntity } from './policial-requerida.entity';
import {
  PolicialRequerida as PolicialRequeridaInterface,
  PoliciaisRequeridas as PoliciaisRequeridasInterface,
} from './policial-requerida.interface';
import { PoliciaisService } from 'src/policiais/policiais.service';

@Injectable()
export class PoliciaisRequeridasService {
  constructor(
    @InjectRepository(PolicialRequeridaEntity)
    private policialRequeridaRepository: Repository<PolicialRequeridaEntity>,
    private logsService: LogsService,
    private policiaisService: PoliciaisService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(
    params: any,
    idUser: User,
  ): Promise<PoliciaisRequeridasInterface> {
    if (idUser.perfil.administrador) {
      return await this.policialRequeridaRepository.find({
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
      return await this.policialRequeridaRepository.find({
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
  ): Promise<PolicialRequeridaInterface | null> {
    const idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.policialRequeridaRepository.findOne({
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

  async create(request: PolicialRequeridaInterface, idUser: User) {
    const object: PolicialRequeridaInterface =
      this.policialRequeridaRepository.create({
        ...request,
        created_by: idUser,
      });
    const save = await this.policialRequeridaRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou uma Requerida de Policial',
      tipo: 1,
      table: 'policiais_requeridas',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: PolicialRequeridaInterface, idUser: User) {
    let data: PolicialRequeridaInterface =
      await this.policialRequeridaRepository.findOneBy({ id: id });
    data = { ...object };

    if (object.boletim_publicacao) {
      this.policiaisService.setBoletimTransferencia(
        //@ts-ignore
        object.policial,
        object.boletim_publicacao,
        idUser,
      );
    }

    await this.policialRequeridaRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou uma requerida de Policial',
      tipo: 2,
      table: 'policiais_requeridas',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    const data = await this.policialRequeridaRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.policialRequeridaRepository.delete(id);

    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma requerida de Policial',
      tipo: 3,
      table: 'policiais_requeridas',
      fk: data.id,
      user: idUser,
    });
  }

  async quantidade(params: any, idUser: User): Promise<number> {
    return await this.policialRequeridaRepository.count({
      where: {
        //@ts-ignore
        boletim_publicacao: IsNull(),
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
  }

  async relatorio(
    object: any,
    idUser: User,
  ): Promise<PoliciaisRequeridasInterface> {
    let policiais;

    policiais = await this.policialRequeridaRepository.find({
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
        policial: {
          setor: {
            subunidade: {
              id: object.subunidade,
            },
          },
        },
      },
    });

    if (object.policial) {
      policiais = policiais.filter((element) => {
        return element.policial.id === object.policial;
      });
    }

    if (object.setor) {
      policiais = policiais.filter((element) => {
        return element.policial.setor.id === object.setor;
      });
    }

    if (object.graduacao) {
      policiais = policiais.filter((element) => {
        return element.policial.graduacao.id === object.graduacao;
      });
    }

    if (object.vigente) {
      policiais = policiais.filter((element) => {
        return element.boletim_publicacao === null;
      });
    }

    if (object.publicado) {
      policiais = policiais.filter((element) => {
        return element.boletim_publicacao !== null;
      });
    }

    return policiais;
  }
}
