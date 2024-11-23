import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ArmamentoCalibre as ArmamentoCalibreEntity } from './armamento-calibre.entity';
import {
  ArmamentoCalibre as ArmamentoCalibreInterface,
  ArmamentosCalibres as ArmamentosCalibresInterface,
} from './armamento-calibre.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class ArmamentosCalibresService {
  constructor(
    @InjectRepository(ArmamentoCalibreEntity)
    private armamentoCalibreRepository: Repository<ArmamentoCalibreEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<ArmamentosCalibresInterface> {
    return await this.armamentoCalibreRepository.find();
  }

  async find(id: number): Promise<ArmamentoCalibreInterface | null> {
    return await this.armamentoCalibreRepository.findOne({ where: { id: id } });
  }

  async create(object: ArmamentoCalibreInterface, idUser: User) {
    var object: ArmamentoCalibreInterface =
      this.armamentoCalibreRepository.create({ ...object, created_by: idUser });
    var save = await this.armamentoCalibreRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um Calibre de armamento',
      tipo: 1,
      table: 'armamentos_calibres',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: ArmamentoCalibreInterface, idUser: User) {
    var data: ArmamentoCalibreInterface =
      await this.armamentoCalibreRepository.findOneBy({ id: id });
    data = { ...object };
    await this.armamentoCalibreRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );

    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um calibre de armamento',
      tipo: 2,
      table: 'armamentos_calibres',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.armamentoCalibreRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.armamentoCalibreRepository.delete(id);

    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um calibre de armamento',
      tipo: 3,
      table: 'armamentos_calibres',
      fk: data.id,
      user: idUser,
    });
  }
}
