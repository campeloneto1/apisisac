import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import {
  In,
  IsNull,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { PolicialFerias as PolicialFeriasEntity } from './policial-ferias.entity';
import {
  PolicialFerias as PolicialFeriasInterface,
  PoliciaisFerias as PoliciaisFeriasInterface,
} from './policial-ferias.interface';
import { User } from 'src/users/user.interface';
import { format } from 'date-fns';
import { LogsService } from 'src/logs/logs.service';
import { PoliciaisPublicacoesService } from 'src/policiais-publicacoes/policiais-publicacoes.service';
import { PolicialPublicacao } from 'src/policiais-publicacoes/policial-publicacao.interface';

@Injectable()
export class PoliciaisFeriasService {
  constructor(
    @InjectRepository(PolicialFeriasEntity)
    private policialFeriasRepository: Repository<PolicialFeriasEntity>,
    private logsService: LogsService,
    private policiaisPublicacoesService: PoliciaisPublicacoesService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(params: any, idUser: User): Promise<PoliciaisFeriasInterface> {
    const hoje = new Date();
    let polsferias: PoliciaisFeriasInterface;
    if (idUser.perfil.administrador) {
      polsferias = await this.policialFeriasRepository.find({
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
      polsferias = await this.policialFeriasRepository.find({
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
      polsferias = polsferias.filter((element) => {
        return (
          new Date(element.data_inicial) <= hoje &&
          new Date(element.data_final) >= hoje
        );
      });
    }

    return polsferias;
  }

  async find(
    id: number,
    idUser: User,
  ): Promise<PolicialFeriasInterface | null> {
    const idsSubs: any = [];
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

  async create(object: PolicialFeriasInterface, idUser: User) {
    const object2: PolicialFeriasInterface =
      this.policialFeriasRepository.create({
        ...object,
        created_by: idUser,
      });
    const save = await this.policialFeriasRepository.save(object2);

    if (save) {
      //@ts-ignore
      let date = object.data_inicial.split('-');
      let months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ];

      let publi: PolicialPublicacao = {
        policial: object.policial,
        //@ts-ignore
        publicacao_tipo: 7,
        boletim: object.boletim,
        texto: `Concessão de ${object.dias} dias de férias referentes ao ano de ${object.ano}, a partir de ${date[2]} de ${months[date[1] - 1]} de ${date[0]}`,
      };
      this.policiaisPublicacoesService.create(publi, idUser);
    }

    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou uma Ferias de Policial',
      tipo: 1,
      table: 'policiais_ferias',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: PolicialFeriasInterface, idUser: User) {
    let data: PolicialFeriasInterface =
      await this.policialFeriasRepository.findOneBy({ id: id });
    data = { ...object };
    await this.policialFeriasRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um Ferias de Policial',
      tipo: 2,
      table: 'policiais_ferias',
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
      mensagem: 'Excluiu uma Ferias de Policial',
      tipo: 3,
      table: 'policiais_ferias',
      fk: data.id,
      user: idUser,
    });
  }

  async quantidade(params: any, idUser: User): Promise<number> {
    return await this.policialFeriasRepository.count({
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
  ): Promise<PoliciaisFeriasInterface | null> {
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

  async relatorio(
    object: any,
    idUser: User,
  ): Promise<PoliciaisFeriasInterface> {
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

    policiais = await this.policialFeriasRepository.find({
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
        return object.policial.includes(element.policial.id);
      });
    }

    if (object.setor) {
      policiais = policiais.filter((element) => {
        return object.setor.includes(element.policial.setor.id);
      });
    }

    if (object.graduacao) {
      policiais = policiais.filter((element) => {
        return object.graduacao.includes(element.policial.graduacao.id);
      });
    }

    if (object.ano) {
      policiais = policiais.filter((element) => {
        return element.ano == object.ano;
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
