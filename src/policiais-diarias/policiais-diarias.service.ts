import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { In, Repository } from 'typeorm';
import { PolicialDiaria as PolicialDiariaEntity } from './policial-diaria.entity';
import {
  PolicialDiaria as PolicialDiariaInterface,
  PoliciaisDiarias as PoliciaisDiariasInterface,
} from './policial-diaria.interface';

@Injectable()
export class PoliciaisDiariasService {
  constructor(
    @InjectRepository(PolicialDiariaEntity)
    private policialDiariaRepository: Repository<PolicialDiariaEntity>,
    private logsService: LogsService,
  ) {}

  async index(): Promise<PoliciaisDiariasInterface> {
    return await this.policialDiariaRepository.find();
  }

  async find(id: number): Promise<PolicialDiariaInterface | null> {
    return await this.policialDiariaRepository.findOne({ where: { id: id } });
  }

  async create(object: PolicialDiariaInterface, idUser: User) {
    const object2: PolicialDiariaInterface =
      this.policialDiariaRepository.create({
        ...object,
        created_by: idUser,
      });
    const save = await this.policialDiariaRepository.save(object2);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou uma diária',
      tipo: 1,
      table: 'policiais_diarias',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: PolicialDiariaInterface, idUser: User) {
    let data: PolicialDiariaInterface =
      await this.policialDiariaRepository.findOneBy({
        id: id,
      });
    data = { ...object };
    await this.policialDiariaRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou uma diária',
      tipo: 2,
      table: 'policiais_diarias',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    const data = await this.policialDiariaRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.policialDiariaRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma diária',
      tipo: 3,
      table: 'policiais_diarias',
      fk: data.id,
      user: idUser,
    });
  }

  async wherePolicial(
    id: number,
    idUser: User,
  ): Promise<PoliciaisDiariasInterface | null> {
    const idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.policialDiariaRepository.find({
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

  async quantidade(params: any, idUser: User): Promise<number> {
    return await this.policialDiariaRepository.count({
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
  }

  async quantidadeEmAberto(params: any, idUser: User): Promise<number> {
    return await this.policialDiariaRepository.count({
      where: [
        {
          diaria_status: {
            cadastrado: true,
          },
          //@ts-ignore
          policial: {
            setor: {
              subunidade: {
                id: params.subunidade,
              },
            },
          },
        },
        {
          diaria_status: {
            em_andamento: true,
          },
          //@ts-ignore
          policial: {
            setor: {
              subunidade: {
                id: params.subunidade,
              },
            },
          },
        },
      ],
    });
  }

  async quantidadePorPol(params: any, idUser: User): Promise<any> {
    return await this.policialDiariaRepository.query(`
        SELECT 
        graduacoes.abreviatura as graduacao,
        policiais.nome_guerra, 
        policiais.numeral,
        setores.nome as setor,
        sum(policiais_diarias.quant_diarias) as quantidade
      FROM policiais_diarias
        inner join policiais
          on policiais_diarias.policialId = policiais.id
        inner join graduacoes
          on policiais.graduacaoId = graduacoes.id
        inner join diarias_status
          on policiais_diarias.diariaStatusId = diarias_status.id
        inner join setores
          on policiais.setorId = setores.id
      WHERE policiais.boletim_transferencia IS NULL
      AND policiais.inativo IS NULL
      AND (diarias_status.em_andamento = 1 or diarias_status.cadastrado = 1)
      AND policiais_diarias.subunidadeId = ${params.subunidade}
      GROUP BY graduacoes.abreviatura,
        policiais.nome_guerra, 
        policiais.numeral,
        setores.nome
      ORDER BY sum(policiais_diarias.quant_diarias) desc
    `);
  }

  async relatorio(
    object: any,
    idUser: User,
  ): Promise<PoliciaisDiariasInterface> {
    const hoje = new Date();
    let policiais;

    policiais = await this.policialDiariaRepository.find({
      relations: {
        policial: {
          graduacao: true,
          setor: {
            subunidade: {
              unidade: true,
            },
          },
        },
        diaria_status: true,
        diaria_tipo: true,
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

    if (object.diaria_status) {
      policiais = policiais.filter((element) => {
        return object.diaria_status.includes(element.diaria_status.id);
      });
    }

    if (object.diaria_tipo) {
      policiais = policiais.filter((element) => {
        return object.diaria_tipo.includes(element.diaria_tipo.id);
      });
    }

    if (object.data_inicial) {
      policiais = policiais.filter((element) => {
        return (
          new Date(element.data_inicial) >= new Date(object.data_inicial) &&
          new Date(element.data_inicial) <= new Date(object.data_final)
        );
      });
    }

    return policiais;
  }
}
