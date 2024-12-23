import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import {
  In,
  IsNull,
  LessThanOrEqual,
  MoreThan,
  Raw,
  Repository,
} from 'typeorm';
import { MaterialConsumo as MaterialConsumoEntity } from './material-consumo.entity';
import {
  MaterialConsumo as MaterialConsumoInterface,
  MateriaisConsumo as MateriaisConsumoInterface,
} from './material-consumo.interface';
import { format } from 'date-fns';

@Injectable()
export class MateriaisConsumoService {
  constructor(
    @InjectRepository(MaterialConsumoEntity)
    private materialConsumoRepository: Repository<MaterialConsumoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(params: any, idUser: User): Promise<MateriaisConsumoInterface> {
    return await this.materialConsumoRepository.find({
      where: {
        //@ts-ignore
        subunidade: {
          id: params.subunidade,
        },
      },
    });
  }

  async find(
    id: number,
    idUser: User,
  ): Promise<MaterialConsumoInterface | null> {
    var idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.materialConsumoRepository.findOne({
      relations: {
        materiais_consumo_entradas_itens: {
          material_consumo_entrada: {
            user: true,
          },
        },
        materiais_consumo_saidas_itens: {
          material_consumo_saida: {
            user: true,
          },
        },
      },
      where: {
        id: id,
        //@ts-ignore
        subunidade: {
          id: In(idsSubs),
        },
      },
    });
  }

  async find2(
    id: number,
    idUser: User,
  ): Promise<MaterialConsumoInterface | null> {
    var idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.materialConsumoRepository.findOne({
      where: {
        id: id,
        //@ts-ignore
        subunidade: {
          id: In(idsSubs),
        },
      },
    });
  }

  async create(object: MaterialConsumoInterface, idUser: User) {
    var object: MaterialConsumoInterface =
      this.materialConsumoRepository.create({ ...object, created_by: idUser });
    var save = await this.materialConsumoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um material de consumo',
      tipo: 1,
      table: 'materiais_consumo',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: MaterialConsumoInterface, idUser: User) {
    var data: MaterialConsumoInterface =
      await this.materialConsumoRepository.findOneBy({ id: id });
    data = { ...object };
    await this.materialConsumoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um material de consumo',
      tipo: 2,
      table: 'materiais_consumo',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.materialConsumoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.materialConsumoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um material de consumo',
      tipo: 3,
      table: 'materiais_consumo',
      fk: data.id,
      user: idUser,
    });
  }

  async disponiveis(
    params: any,
    idUser: User,
  ): Promise<MateriaisConsumoInterface> {
    return await this.materialConsumoRepository.find({
      where: {
        data_baixa: IsNull(),
        quantidade: MoreThan(0),
        //@ts-ignore
        subunidade: {
          id: params.subunidade,
        },
      },
    });
  }

  async atualizarQuantidadeUp(id: number, quantidade: number): Promise<void> {
    var data: MaterialConsumoInterface =
      await this.materialConsumoRepository.findOneBy({ id: id });
    data.quantidade = Number(data.quantidade) + Number(quantidade);
    await this.materialConsumoRepository.update({ id: id }, { ...data });
  }

  async atualizarQuantidadeDown(id: number, quantidade: number): Promise<void> {
    var data: MaterialConsumoInterface =
      await this.materialConsumoRepository.findOneBy({ id: id });
    data.quantidade = data.quantidade - quantidade;
    await this.materialConsumoRepository.update({ id: id }, { ...data });
  }

  async vencendo(
    params: any,
    idUser: User,
  ): Promise<MateriaisConsumoInterface> {
    let result = new Date();
    var proxsemana = result.setDate(result.getDate() + 30);

    return await this.materialConsumoRepository.find({
      where: {
        //@ts-ignore
        subunidade: {
          id: params.subunidade,
        },
        data_baixa: IsNull(),
        //@ts-ignore
        data_validade: LessThanOrEqual(format(proxsemana, 'yyyy-MM-dd')),
      },
    });
  }

  async alerta(params: any, idUser: User): Promise<MateriaisConsumoInterface> {
    return await this.materialConsumoRepository.findBy({
      //@ts-ignore
      subunidade: {
        id: params.subunidade,
      },
      data_baixa: IsNull(),
      quantidade: Raw((alias) => `${alias} <= quantidade_alerta`),
    });
  }

  async relatorio(
    object: any,
    idUser: User,
  ): Promise<MateriaisConsumoInterface> {
    var materiais;

    materiais = await this.materialConsumoRepository.find({
      where: {
        //@ts-ignore
        subunidade: {
          id: object.subunidade,
        },
      },
      order: {
        serial: 'ASC',
      },
    });

    if (object.marca) {
      materiais = materiais.filter((element) => {
        return element.modelo.marca.id === object.marca;
      });
    }

    if (object.modelo) {
      materiais = materiais.filter((element) => {
        return element.modelo.id === object.modelo;
      });
    }

    if (object.material_consumo_tipo) {
      materiais = materiais.filter((element) => {
        return (
          element.material_consumo_tipo.id === object.material_consumo_tipo
        );
      });
    }

    if (object.data_baixa) {
      materiais = materiais.filter((element) => {
        return element.data_baixa !== null;
      });
    }

    return materiais;
  }
}
