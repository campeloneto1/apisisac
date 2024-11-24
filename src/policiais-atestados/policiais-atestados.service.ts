import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicialAtestado as PolicialAtestadoEntity } from './policial-atestado.entity';
import {
  PolicialAtestado as PolicialAtestadoInterface,
  PoliciaisAtestados as PoliciaisAtestadosInterface,
} from './policial-atestado.interface';
import {
  In,
  IsNull,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { User } from 'src/users/user.interface';
import { format } from 'date-fns';
import { LogsService } from 'src/logs/logs.service';
import { PoliciaisPublicacoesService } from 'src/policiais-publicacoes/policiais-publicacoes.service';

@Injectable()
export class PoliciaisAtestadosService {
  constructor(
    @InjectRepository(PolicialAtestadoEntity)
    private policialAtestadoRepository: Repository<PolicialAtestadoEntity>,
    private logsService: LogsService,
    private policiaisPublicacoesService: PoliciaisPublicacoesService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(params: any, idUser: User): Promise<PoliciaisAtestadosInterface> {
    const hoje = new Date();
    let polsatest: PoliciaisAtestadosInterface;
    if (idUser.perfil.administrador) {
      polsatest = await this.policialAtestadoRepository.find({
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
      polsatest = await this.policialAtestadoRepository.find({
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
    if (params.ativo) {
      polsatest = polsatest.filter((element) => {
        return (
          new Date(element.data_inicial) <= hoje &&
          new Date(element.data_final) >= hoje
        );
      });
    }

    return polsatest;
  }

  async find(
    id: number,
    idUser: User,
  ): Promise<PolicialAtestadoInterface | null> {
    const idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.policialAtestadoRepository.findOne({
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

  async create(object: PolicialAtestadoInterface, idUser: User) {
    const object2: PolicialAtestadoInterface =
      this.policialAtestadoRepository.create({ ...object, created_by: idUser });
    const save = await this.policialAtestadoRepository.save(object2);

    // if(save){
    //   let obj: PolicialPublicacao = {
    //     policial: object.policial,
    //     publicacao_tipo: ,
    //     texto: ,
    //     boletim: ,
    //   }
    //   this.policiaisPublicacoesService.create(obj,idUser);
    // }

    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um Atestado de Policial',
      tipo: 1,
      table: 'policiais_atestados',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: PolicialAtestadoInterface, idUser: User) {
    let data: PolicialAtestadoInterface =
      await this.policialAtestadoRepository.findOneBy({ id: id });
    data = { ...object };
    await this.policialAtestadoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um Atestado de Policial',
      tipo: 2,
      table: 'policiais_atestados',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    const data = await this.policialAtestadoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.policialAtestadoRepository.delete(id);

    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um Atestado de Policial',
      tipo: 3,
      table: 'policiais_atestados',
      fk: data.id,
      user: idUser,
    });
  }

  async quantidade(params: any, idUser: User): Promise<number> {
    return await this.policialAtestadoRepository.count({
      where: {
        //@ts-ignore
        data_inicial: LessThanOrEqual(format(new Date(), 'yyyy-MM-dd')),
        //@ts-ignore
        data_final: MoreThanOrEqual(format(new Date(), 'yyyy-MM-dd')),
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

  async wherePolicial(
    id: number,
    idUser: User,
  ): Promise<PoliciaisAtestadosInterface | null> {
    var idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.policialAtestadoRepository.find({
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

  async relatorio(
    object: any,
    idUser: User,
  ): Promise<PoliciaisAtestadosInterface> {
    const hoje = new Date();

    let policiais;

    // var filter:any = {};

    // if(object.subunidade){
    //   filter.policial =  {setor: { subunidade: {id: object.subunidade}}};
    // }

    // if(object.setor){
    //   filter.setor = {id: object.setor};
    // }

    // if(object.graduacao){
    //   filter.graduacao = {id: object.graduacao};
    // }

    // if(object.ano){
    //   filter.ano = object.ano;
    // }

    policiais = await this.policialAtestadoRepository.find({
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

    if (object.afastamento_tipo) {
      policiais = policiais.filter((element) => {
        return element.afastamento_tipo.id === object.afastamento_tipo;
      });
    }

    if (object.vigente) {
      policiais = policiais.filter((element) => {
        return (
          new Date(element.data_inicial) <= hoje &&
          new Date(element.data_final) >= hoje
        );
      });
    }

    return policiais;
  }
}
