import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { MateriaisConsumoService } from 'src/materiais-consumo/materiais-consumo.service';
import { Repository } from 'typeorm';
import { MaterialConsumoEntradaItem as MaterialConsumoEntradaItemEntity } from 'src/materiais-consumo-entradas-itens/material-consumo-entrada-item.entity';
import {
  MaterialConsumoEntradaItem as MaterialConsumoEntradaItemInterface,
  MateriaisConsumoEntradasItens as MateriaisConsumoEntradasItensInterface,
} from './material-consumo-entrada-item.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class MateriaisConsumoEntradasItensService {
  constructor(
    @InjectRepository(MaterialConsumoEntradaItemEntity)
    private materialConsumoEntradaItemRepository: Repository<MaterialConsumoEntradaItemEntity>,
    private lazyModuleLoader: LazyModuleLoader,
    private logsService: LogsService,
    private materiaisConsumoService: MateriaisConsumoService,
  ) {}

  async index(): Promise<MateriaisConsumoEntradasItensInterface> {
    return await this.materialConsumoEntradaItemRepository.find();
  }

  async find(id: number): Promise<MaterialConsumoEntradaItemInterface | null> {
    return await this.materialConsumoEntradaItemRepository.findOne({
      where: { id: id },
    });
  }

  async create(objectreq: MaterialConsumoEntradaItemInterface, idUser: User) {
    const object: MaterialConsumoEntradaItemInterface =
      this.materialConsumoEntradaItemRepository.create({
        ...objectreq,
        created_by: idUser,
      });
    const save = await this.materialConsumoEntradaItemRepository.save(object);

    this.materiaisConsumoService.atualizarQuantidadeUp(
      //@ts-ignore
      object.material_consumo,
      object.quantidade,
    );

    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um item na entrada de material de consumo',
      tipo: 1,
      table: 'materiais_consumo_entradas_itens',
      fk: save.id,
      user: idUser,
    });
  }

  async update(
    id: number,
    object: MaterialConsumoEntradaItemInterface,
    idUser: User,
  ) {
    let data: MaterialConsumoEntradaItemInterface =
      await this.materialConsumoEntradaItemRepository.findOneBy({ id: id });
    data = { ...object };
    await this.materialConsumoEntradaItemRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
  }

  async remove(id: number, idUser: User) {
    const object: MaterialConsumoEntradaItemInterface =
      await this.materialConsumoEntradaItemRepository.findOne({
        where: { id: id },
      });
    this.materiaisConsumoService.atualizarQuantidadeDown(
      object.material_consumo.id,
      object.quantidade,
    );
    await this.materialConsumoEntradaItemRepository.delete(id);

    await this.logsService.create({
      object: JSON.stringify(object),
      mensagem: 'Excluiu um item na entrada de material de consumo',
      tipo: 3,
      table: 'materiais_consumo_entradas_itens',
      fk: object.id,
      user: idUser,
    });
  }

  async whereMatCon(
    id: number,
  ): Promise<MateriaisConsumoEntradasItensInterface> {
    return await this.materialConsumoEntradaItemRepository.find({
      where: {
        material_consumo_entrada: {
          id: id,
        },
      },
    });
  }
}
