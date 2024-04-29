import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Policial as PolicialEntity } from './policial.entity';
import {
  Policial as PolicialInterface,
  Policiais as PoliciaisInterface,
} from './policial.interface';
import { User } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import { UtilitiesService } from 'src/utilities/utilities.service';

@Injectable()
export class PoliciaisService {
  constructor(
    @InjectRepository(PolicialEntity)
    private policialRepository: Repository<PolicialEntity>,
    private lazyModuleLoader: LazyModuleLoader,
    private usersService: UsersService,
    private utilitiesService: UtilitiesService,
  ) {}

  async index(idUser: User): Promise<PoliciaisInterface> {
    return await this.policialRepository.find({
      where:{
        //@ts-ignore
        setor: {
          subunidade: {
            id: idUser.subunidade.id
          }
        }
      },
      relations: {
        user: {
         policial: false,
          perfil: false
        },
        
      }
    });
  }

  async find(id: number, idUser: User): Promise<PolicialInterface | null> {
    return await this.policialRepository.findOne({
      where: { 
        id: id,
        //@ts-ignore
        setor: {
          subunidade: {
            id: idUser.subunidade.id
          }
        }
       },
      relations: {
        policiais_publicacoes: { policial: false },
        policiais_ferias: { policial: false },
        policiais_atestados: { policial: false },
        armamentos_emprestimos: { 
          policial: false,
          armamentos_emprestimos_itens: {
            armamento: {
              modelo: true
            }
          }
        },
        veiculos_policiais: {
          policial: false,
          veiculo: {
            modelo: {
              marca: true
            }
          }
        }
      },
    });
  }

  async create(object: PolicialInterface, idUser: User) {
    var object: PolicialInterface = this.policialRepository.create({
      ...object,
      created_by: idUser,
    });
    var policial = await this.policialRepository.save(object);
    var salt = await this.utilitiesService.generateSalt(10);
    var password = await this.utilitiesService.hashString(`${object.cpf}${salt}`);
    var user: User = {
        nome: object.nome,
        cpf: object.cpf,
        password: password,
        salt: salt,
        subunidade: policial.setor.subunidade,
        policial: policial,
        //@ts-ignore
        perfil: 3
    }
    await this.usersService.create(user, idUser);
  }

  async update(id: number, object: PolicialInterface, idUser: User) {
    var data: PolicialInterface = await this.policialRepository.findOneBy({
      id: id,
    });
    data = { ...object };
    await this.policialRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
  }

  async remove(id: number, idUser: User) {
    return await this.policialRepository.delete(id);
  }

  async disponiveis(idUser: User): Promise<PoliciaisInterface> {
    return await this.policialRepository.find({
      where: { 
        boletim_transferencia: IsNull(),
        //@ts-ignore
        setor: {
          subunidade: {
            id: idUser.subunidade.id
          }
        }
      },
    });
  }

  async quantidade(idUser: User): Promise<number> {
    return await this.policialRepository.count({
      where: { 
        boletim_transferencia: IsNull(),
        //@ts-ignore
        setor: {
          subunidade: {
            id: idUser.subunidade.id
          }
        }
      },
    });
  }
}
