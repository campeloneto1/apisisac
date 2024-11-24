import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { In, IsNull, Repository } from 'typeorm';
import { PolicialHistorico as PolicialHistoricoEntity } from './policial-historico.entity';
import {
  PolicialHistorico as PolicialHistoricoInterface,
  PoliciaisHistoricos as PoliciaisHistoricosInterface,
} from './policial-historico.interface';
import { PoliciaisService } from 'src/policiais/policiais.service';
import { Policial } from 'src/policiais/policial.interface';
@Injectable()
export class PoliciaisHistoricoService {
  constructor(
    @InjectRepository(PolicialHistoricoEntity)
    private policialHistoricoRepository: Repository<PolicialHistoricoEntity>,
    private logsService: LogsService,
    private policiaisService: PoliciaisService,
  ) {}

  async index(
    params: any,
    idUser: User,
  ): Promise<PoliciaisHistoricosInterface> {
    let polsferias: PoliciaisHistoricosInterface;
    if (idUser.perfil.administrador) {
      polsferias = await this.policialHistoricoRepository.find({
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
      polsferias = await this.policialHistoricoRepository.find({
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

    return polsferias;
  }

  async find(
    id: number,
    idUser: User,
  ): Promise<PolicialHistoricoInterface | null> {
    const idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.policialHistoricoRepository.findOne({
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

  async create(object: PolicialHistoricoInterface, idUser: User) {
    const object2: PolicialHistoricoInterface =
      this.policialHistoricoRepository.create({
        ...object,
        created_by: idUser,
      });
    const save = await this.policialHistoricoRepository.save(object2);

    let policial: Policial = await this.policiaisService.find2(
        //@ts-ignore
      object.policial,
      idUser,
    );
    policial.setor = object.setor_destino;
    await this.policiaisService.update(policial.id, policial, idUser);

    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Transferiu um Policial',
      tipo: 1,
      table: 'policiais_historicos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: PolicialHistoricoInterface, idUser: User) {
    let data: PolicialHistoricoInterface =
      await this.policialHistoricoRepository.findOneBy({ id: id });
    data = { ...object };
    await this.policialHistoricoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou uma transferência Policial',
      tipo: 2,
      table: 'policiais_historicos',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    const data = await this.policialHistoricoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.policialHistoricoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma transferÊncia Policial',
      tipo: 3,
      table: 'policiais_historicos',
      fk: data.id,
      user: idUser,
    });
  }

  async wherePol(
    id: number,
    idUser: User,
  ): Promise<PoliciaisHistoricosInterface> {
    return await this.policialHistoricoRepository.find({
      relations: {
        setor_destino: true,
        setor_origem: true,
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
          id: id,
        },
      },
    });
  }
}
