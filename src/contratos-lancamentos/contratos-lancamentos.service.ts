import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ContratoLancamento as ContratoLancamentoEntity } from './contrato-lancamento.entity';
import {
  ContratoLancamento as ContratoLancamentoInterface,
  ContratosLancamentos as ContratosLancamentosInterface,
} from './contrato-lancamento.interface';
import { ContratosService } from 'src/contratos/contratos.service';
@Injectable()
export class ContratosLancamentosService {
  constructor(
    @InjectRepository(ContratoLancamentoEntity)
    private contratoLancamentoRepository: Repository<ContratoLancamentoEntity>,
    private logsService: LogsService,
    private constatrosService: ContratosService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(idUser: User): Promise<ContratosLancamentosInterface> {
    if (idUser.perfil.administrador) {
      return await this.contratoLancamentoRepository.find({
        relations: {
          contrato: true,
        },
      });
    } else {
      return await this.contratoLancamentoRepository.find({
        relations: {
          contrato: true,
        },
        where: {
          contrato: {
            subunidade: {
              id: idUser.subunidade.id,
            },
          },
        },
      });
    }
  }

  async find(id: number): Promise<ContratoLancamentoInterface | null> {
    return await this.contratoLancamentoRepository.findOne({
      relations: {
        contrato: {
          gestor: {
            graduacao: true,
          },
          fiscal: {
            graduacao: true,
          },
        },
      },
      where: { id: id },
    });
  }

  async create(object: ContratoLancamentoInterface, idUser: User) {
    var object2: ContratoLancamentoInterface =
      this.contratoLancamentoRepository.create({
        ...object,
        created_by: idUser,
      });
    var save = await this.contratoLancamentoRepository.save(object2);
    //@ts-ignore
    await this.constatrosService.valorUsadoUp(object.contrato, object.valor, idUser);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um lançamento de contrato',
      tipo: 1,
      table: 'contratos_lancamentos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: ContratoLancamentoInterface, idUser: User) {
    var data: ContratoLancamentoInterface =
      await this.contratoLancamentoRepository.findOneBy({ id: id });

    data = { ...object };
    await this.contratoLancamentoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um lançamento de contrato',
      tipo: 2,
      table: 'contratos_lancamentos',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.contratoLancamentoRepository.findOne({
      relations:{
        contrato: true
      },
      where: {
        id: id,
      },
    });
    await this.contratoLancamentoRepository.delete(id);
    await this.constatrosService.valorUsadoDown(data.contrato.id, data.valor, idUser);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um lançamento de contrato',
      tipo: 3,
      table: 'contratos_lançamentos',
      fk: data.id,
      user: idUser,
    });
  }
}
