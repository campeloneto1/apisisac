import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, LessThanOrEqual, Not, Raw, Repository } from 'typeorm';
import { Veiculo as VeiculoEntity } from './veiculo.entity';
import {
  Veiculo as VeiculoInterface,
  Veiculos as VeiculosInterface,
} from './veiculo.interface';
import { User } from 'src/users/user.interface';
import { VeiculosOficinasService } from 'src/veiculos-oficinas/veiculos-oficinas.service';
import { VeiculosPoliciaisService } from 'src/veiculos-policiais/veiculos-policiais.service';
import { LogsService } from 'src/logs/logs.service';
import { format } from 'date-fns';

@Injectable()
export class VeiculosService {
  constructor(
    @InjectRepository(VeiculoEntity)
    private veiculoRepository: Repository<VeiculoEntity>,
    private logsService: LogsService,
    @Inject(forwardRef(() => VeiculosOficinasService))
    private veiculosOficinasService: VeiculosOficinasService,
    @Inject(forwardRef(() => VeiculosPoliciaisService))
    private veiculosPoliciaisService: VeiculosPoliciaisService,
  ) {}

  async index(params: any, idUser: User): Promise<VeiculosInterface> {
    return await this.veiculoRepository.find({
      where: {
        subunidade: {
          id: params.subunidade,
        },
      },
    });
  }

  async find(id: number, idUser: User): Promise<VeiculoInterface | null> {
    const idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.veiculoRepository.findOne({
      relations: {
        veiculos_oficinas: {
          veiculo: false,
        },
        veiculos_policiais: {
          policial: {
            graduacao: true,
          },
          veiculo: false,
        },
      },
      where: {
        id: id,
        subunidade: {
          id: In(idsSubs),
        },
      },
    });
  }

  async find2(id: number, idUser: User): Promise<VeiculoInterface | null> {
    const idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.veiculoRepository.findOne({
      where: {
        id: id,
        subunidade: {
          id: In(idsSubs),
        },
      },
    });
  }

  async create(request: VeiculoInterface, idUser: User) {
    const object: VeiculoInterface = this.veiculoRepository.create({
      ...request,
      km_atual: request.km_inicial,
      created_by: idUser,
    });
    const save = await this.veiculoRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um Veiculo',
      tipo: 1,
      table: 'veiculos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: VeiculoInterface, idUser: User) {
    let data: VeiculoInterface = await this.veiculoRepository.findOneBy({
      id: id,
    });
    data = { ...object };

    await this.veiculoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um Veiculo',
      tipo: 2,
      table: 'veiculos',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    const data = await this.veiculoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.veiculoRepository.delete(id);

    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um Veiculo',
      tipo: 3,
      table: 'veiculos',
      fk: data.id,
      user: idUser,
    });
  }

  async disponiveis(params: any, idUser: User): Promise<VeiculosInterface> {
    const naoficina = await this.veiculosOficinasService.emmanutencao(
      params,
      idUser,
    );
    const emprestados = await this.veiculosPoliciaisService.emprestados(
      params,
      idUser,
    );
    const ids = [];
    naoficina.forEach((element) => {
      ids.push(element.veiculo.id);
    });
    emprestados.forEach((element) => {
      ids.push(element.veiculo.id);
    });

    return await this.veiculoRepository.find({
      where: {
        id: Not(In(ids)),
        data_baixa: IsNull(),
        nao_disponivel: IsNull(),
        subunidade: {
          id: params.subunidade,
        },
      },
    });
  }

  async getAll(params: any, idUser: User): Promise<VeiculosInterface> {
    const naoficina = await this.veiculosOficinasService.emmanutencaoAll(
      params,
      idUser,
    );
    const emprestados = await this.veiculosPoliciaisService.emprestadosAll(
      params,
      idUser,
    );
    const ids = [];
    naoficina.forEach((element) => {
      ids.push(element.veiculo.id);
    });
    emprestados.forEach((element) => {
      ids.push(element.veiculo.id);
    });

    return await this.veiculoRepository.find({
      where: {
        id: Not(In(ids)),
        data_baixa: IsNull(),
        nao_disponivel: IsNull(),
      },
    });
  }

  async quantidade(params: any, idUser: User): Promise<number> {
    return await this.veiculoRepository.count({
      where: {
        data_baixa: IsNull(),
        nao_disponivel: IsNull(),
        subunidade: {
          id: params.subunidade,
        },
      },
    });
  }

  async quantidadeViagem(params: any, idUser: User): Promise<number> {
    return await this.veiculoRepository.count({
      where: {
        data_baixa: IsNull(),
        nao_disponivel: IsNull(),
        disponivel_viagem: true,
        subunidade: {
          id: params.subunidade,
        },
      },
    });
  }

  async disponiveisViagem(
    params: any,
    idUser: User,
  ): Promise<VeiculosInterface> {
    const naoficina = await this.veiculosOficinasService.emmanutencao(
      params,
      idUser,
    );
    const emprestados = await this.veiculosPoliciaisService.emprestados(
      params,
      idUser,
    );
    const ids = [];
    naoficina.forEach((element) => {
      ids.push(element.veiculo.id);
    });
    emprestados.forEach((element) => {
      ids.push(element.veiculo.id);
    });

    return await this.veiculoRepository.find({
      where: {
        id: Not(In(ids)),
        data_baixa: IsNull(),
        nao_disponivel: IsNull(),
        disponivel_viagem: true,
        subunidade: {
          id: params.subunidade,
        },
      },
    });
  }

  async trocaoleo(params: any, idUser: User): Promise<VeiculosInterface> {
    return await this.veiculoRepository.find({
      where: {
        km_troca_oleo: Not(IsNull()),
        km_atual: Raw((alias) => `${alias} >= km_troca_oleo - 100`),
        data_baixa: IsNull(),
        subunidade: {
          id: params.subunidade,
        },
      },
    });
  }

  async revisao(params: any, idUser: User): Promise<VeiculosInterface> {
    const result = new Date();
    const proxsemana = result.setDate(result.getDate() + 30);
    return await this.veiculoRepository.find({
      where: [
        {
          km_revisao: Not(IsNull()),
          km_atual: Raw((alias) => `${alias} >= km_revisao - 100`),
          data_baixa: IsNull(),
          subunidade: {
            id: params.subunidade,
          },
        },
        {
          //@ts-ignore
          data_revisao: LessThanOrEqual(format(proxsemana, 'yyyy-MM-dd')),
          data_baixa: IsNull(),
          //@ts-ignore
          subunidade: {
            id: params.subunidade,
          },
        },
      ],
    });
  }

  async relatorio(object: any, idUser: User): Promise<VeiculosInterface> {
    let veiculos;

    veiculos = await this.veiculoRepository.find({
      where: {
        data_baixa: IsNull(),
        //@ts-ignore
        subunidade: {
          id: object.subunidade,
        },
      },
      order: {
        placa: 'ASC',
      },
    });

    if (object.marca) {
      veiculos = veiculos.filter((element) => {
        return element.modelo.marca.id === object.marca;
      });
    }

    if (object.modelo) {
      veiculos = veiculos.filter((element) => {
        return element.modelo.id === object.modelo;
      });
    }

    if (object.veiculo_tipo) {
      veiculos = veiculos.filter((element) => {
        return element.veiculo_tipo.id === object.veiculo_tipo;
      });
    }

    if (object.blindado) {
      veiculos = veiculos.filter((element) => {
        return element.blindado === true;
      });
    }

    if (object.organico) {
      veiculos = veiculos.filter((element) => {
        return element.organico === true;
      });
    }

    if (object.locado) {
      veiculos = veiculos.filter((element) => {
        return element.organico !== true;
      });
    }

    if (object.data_baixa) {
      veiculos = veiculos.filter((element) => {
        return element.data_baixa !== null;
      });
    } else {
      veiculos = veiculos.filter((element) => {
        return element.data_baixa === null;
      });
    }

    return veiculos;
  }
}
