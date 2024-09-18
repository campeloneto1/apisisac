import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { In, Repository } from 'typeorm';
import { VeiculoPolicialAlteracao as VeiculoPolicialAlteracaoEntity } from './veiculo-policial-alteracao.entity';
import {
  VeiculoPolicialAlteracao as VeiculoPolicialAlteracaoInterface,
  VeiculosPoliciaisAlteracoes as VeiculosPoliciaisAlteracoesInterface,
} from './veiculo-policial-alteracao.interface';
@Injectable()
export class VeiculosPoliciaisAlteracoesService {
  constructor(
    @InjectRepository(VeiculoPolicialAlteracaoEntity)
    private veiculoPolicialAlteracaoRository: Repository<VeiculoPolicialAlteracaoEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(params: any, idUser: User) {}

  async find(id: number, idUser: User) {}

  async create(object: VeiculoPolicialAlteracaoInterface, idUser: User) {
    var object: VeiculoPolicialAlteracaoInterface =
      this.veiculoPolicialAlteracaoRository.create({
        ...object,
        created_by: idUser,
      });
    var save = await this.veiculoPolicialAlteracaoRository.save(object);

    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou uma Alteração no Emp. do Veículo',
      tipo: 1,
      table: 'veiculos_policiais_alteracoes',
      fk: save.id,
      user: idUser,
    });
  }

  async update(
    id: number,
    object: VeiculoPolicialAlteracaoInterface,
    idUser: User,
  ) {}

  async remove(id: number, idUser: User) {
    var data = await this.veiculoPolicialAlteracaoRository.findOne({
      where: {
        id: id,
      },
    });
    await this.veiculoPolicialAlteracaoRository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma alteração no Emprestimo de Veiculo',
      tipo: 3,
      table: 'veiculos_policiais_alteracoes',
      fk: data.id,
      user: idUser,
    });
  }
}
