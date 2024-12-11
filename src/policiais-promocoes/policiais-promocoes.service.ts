import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { In, Repository } from 'typeorm';
import { PolicialPromocao as PolicialPromocaoEntity } from './policial-promocao.entity';
import {
  PolicialPromocao as PolicialPromocaoInterface,
  PoliciaisPromocoes as PoliciaisPromocoesInterface,
} from './policial-promocao.interface';
import { PoliciaisService } from 'src/policiais/policiais.service';

@Injectable()
export class PoliciaisPromocoesService {
  constructor(
    @InjectRepository(PolicialPromocaoEntity)
    private policialPromocaoRepository: Repository<PolicialPromocaoEntity>,
    private logsService: LogsService,
    private policiaisService: PoliciaisService,
  ) {}

  async index(): Promise<PoliciaisPromocoesInterface> {
    return await this.policialPromocaoRepository.find();
  }

  async find(id: number): Promise<PolicialPromocaoInterface | null> {
    return await this.policialPromocaoRepository.findOne({ where: { id: id } });
  }

  async create(object: PolicialPromocaoInterface, idUser: User) {
    //@ts-ignore
    object.policial.map(async (item) => {
      const object2: PolicialPromocaoInterface =
        this.policialPromocaoRepository.create({
          policial: item,
          data_promocao: object.data_promocao,
          graduacao: object.graduacao,
          boletim: object.boletim,
          observacoes: object.observacoes,
          created_by: idUser,
        });
      const save = await this.policialPromocaoRepository.save(object2);
      await this.policiaisService.promover(
        item,
        //@ts-ignore
        object.graduacao,
        idUser,
      );

      await this.logsService.create({
        object: JSON.stringify(save),
        mensagem: 'Cadastrou uma promoção ',
        tipo: 1,
        table: 'policiais_promocoes',
        fk: save.id,
        user: idUser,
      });
    });
  }

  async update(id: number, object: PolicialPromocaoInterface, idUser: User) {
    let data: PolicialPromocaoInterface =
      await this.policialPromocaoRepository.findOneBy({
        id: id,
      });
    data = { ...object };
    await this.policialPromocaoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou uma promoção',
      tipo: 2,
      table: 'policiais_promocoes',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    const data = await this.policialPromocaoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.policialPromocaoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma promoção',
      tipo: 3,
      table: 'policiais_promocoes',
      fk: data.id,
      user: idUser,
    });
  }

  async wherePolicial(
    id: number,
    idUser: User,
  ): Promise<PoliciaisPromocoesInterface | null> {
    const idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.policialPromocaoRepository.find({
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
  ): Promise<PoliciaisPromocoesInterface> {
    const hoje = new Date();
    let policiais;

    policiais = await this.policialPromocaoRepository.find({
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
        return object.graduacao.includes(element.graduacao.id);
      });
    }

    return policiais;
  }
}
