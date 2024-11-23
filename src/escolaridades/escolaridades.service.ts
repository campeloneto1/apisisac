import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { Repository } from 'typeorm';
import { Escolaridade as EscolaridadeEntity } from './escolaridade.entity';
import {
  Escolaridade as EscolaridadeInterface,
  Escolaridades as EscolaridadesInterface,
} from './escolaridade.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class EscolaridadesService {
  constructor(
    @InjectRepository(EscolaridadeEntity)
    private escolaridadeRepository: Repository<EscolaridadeEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<EscolaridadesInterface> {
    return await this.escolaridadeRepository.find();
  }

  async find(id: number): Promise<EscolaridadeInterface | null> {
    return await this.escolaridadeRepository.findOne({ where: { id: id } });
  }

  async create(object: EscolaridadeInterface, idUser: User) {
    var object: EscolaridadeInterface = this.escolaridadeRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.escolaridadeRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou uma escolaridade',
      tipo: 1,
      table: 'escolaridades',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: EscolaridadeInterface, idUser: User) {
    var data: EscolaridadeInterface =
      await this.escolaridadeRepository.findOneBy({ id: id });
    data = { ...object };
    await this.escolaridadeRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou uma escolaridade',
      tipo: 2,
      table: 'escolaridades',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.escolaridadeRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.escolaridadeRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma escolaridade',
      tipo: 3,
      table: 'escolaridades',
      fk: data.id,
      user: idUser,
    });
  }

  async policiaisEscolaridades(idUser: User): Promise<any> {
    return await this.escolaridadeRepository.query(`
            SELECT escolaridades.nome, count(policiais.id) as quantidade
            FROM escolaridades
            LEFT JOIN policiais ON escolaridades.id = policiais.escolaridadeId
            LEFT JOIN setores ON setores.id = policiais.setorId
            WHERE policiais.boletim_transferencia IS NULL
            AND setores.subunidadeId = ${idUser.subunidade.id}
            GROUP BY escolaridades.nome
            ORDER BY escolaridades.id DESC
          `);
  }
}
