import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { Policial as PolicialEntity } from './policial.entity';
import {
  Policial as PolicialInterface,
  Policiais as PoliciaisInterface,
} from './policial.interface';
import { User } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { LogsService } from 'src/logs/logs.service';
import { UsersSubunidadesService } from 'src/users-subunidades/users-subunidades.service';
import { UserSubunidade } from 'src/users-subunidades/user-subunidade.interface';

@Injectable()
export class PoliciaisService {
  constructor(
    @InjectRepository(PolicialEntity)
    private policialRepository: Repository<PolicialEntity>,
    private lazyModuleLoader: LazyModuleLoader,
    private usersService: UsersService,
    private usersSubunidadesService: UsersSubunidadesService,
    private utilitiesService: UtilitiesService,
    private logsService: LogsService
  ) {}

  async index(params:any,idUser: User): Promise<PoliciaisInterface> {

   
      return await this.policialRepository.find({
        where:{
          //@ts-ignore
          setor: {
            subunidade: {
              id: params.subunidade
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
    var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
    return await this.policialRepository.findOne({
      where: { 
        id: id,
        setor: {
          subunidade:{
            id: In(idsSubs)
          }
        }
       },
      relations: {
        policiais_publicacoes: { policial: false },
        policiais_cursos: { policial: false },
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
        materiais_policiais: { 
          policial: false,
          materiais_policiais_itens: {
            material: {
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

  async find2(id: number, idUser: User): Promise<PolicialInterface | null> {
    var idsSubs:any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id)
    });
    return await this.policialRepository.findOne({
      where: { 
        id: id,
        //@ts-ignore
        setor: {
          subunidade: {
            id: In(idsSubs)
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

    await this.logsService.create({
      object: JSON.stringify(policial),
      mensagem: 'Cadastrou um Policial',
      tipo: 1,
      table: 'policiais',
      fk: policial.id,
      user: idUser
    });

    var salt = await this.utilitiesService.generateSalt(10);
    var password = await this.utilitiesService.hashString(`${object.cpf}${salt}`);
    var save = await this.policialRepository.findOne({relations: {
      setor: true,
    },where: {id: policial.id}});
    var user: User = {
        nome: object.nome,
        cpf: object.cpf,
        password: password,
        salt: salt,
        //@ts-ignore
        subunidade: save.setor.subunidade.id,
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
    var dataold = data;
    data = { ...object };
    await this.policialRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );

    var upuser = false;
    var user = await this.usersService.wherePol2(id);
    if(user){
      if(object.nome && user.nome != object.nome){
        upuser = true;
        user.nome = object.nome;
      }
      if(object.cpf && user.cpf != object.cpf){
        upuser = true;
        user.cpf = object.cpf;
      }
      if(object.telefone1 && user.telefone != object.telefone1){
        upuser = true;
        user.telefone = object.telefone1;
      }
      if(object.email && user.email != object.email){
        upuser = true;
        user.email = object.email;
      }
  
      if(upuser){
        await this.usersService.update(user.id, user, idUser);
      }
    }
    

    await this.logsService.create({
      object: JSON.stringify(data),
      object_old: JSON.stringify(dataold),
      mensagem: 'Editou um Policial',
      tipo: 2,
      table: 'policiais',
      fk: id,
      user: idUser
    });
  }

  async remove(id: number, idUser: User) {
    var del = this.policialRepository.findOne({
      where: { 
        id: id,
       }
    });
    await this.logsService.create({
      object: JSON.stringify(del),
      mensagem: 'Excluiu um Policial',
      tipo: 3,
      table: 'policiais',
      fk: id,
      user: idUser
    });
    await this.policialRepository.delete(id);
  }

  async disponiveis(params:any,idUser: User): Promise<PoliciaisInterface> {
   
      return await this.policialRepository.find({
        where: { 
          boletim_transferencia: IsNull(),
          //@ts-ignore
          setor: {
            subunidade: {
              id: params.subunidade
            }
          }
        },
      });
    
  }

  async getAll(params:any,idUser: User): Promise<PoliciaisInterface> {
   
    return await this.policialRepository.find({
      relations: {
          setor: {
            subunidade: true
        },
      },
      where: { 
        boletim_transferencia: IsNull(),
      },
    });
  
}

  async quantidade(params:any,idUser: User): Promise<number> {
    return await this.policialRepository.count({
      where: { 
        boletim_transferencia: IsNull(),
        //@ts-ignore
        setor: {
          subunidade: {
            id: params.subunidade
          }
        }
      },
    });
  }

  async updateFoto(id: number, object: any, idUser: User) {
    var data: PolicialInterface = await this.policialRepository.findOneBy({
      id: id,
    });
    var dataold = data;
    data.foto = object.foto;
    await this.policialRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    
    await this.logsService.create({
      object: JSON.stringify(data),
      object_old: JSON.stringify(dataold),
      mensagem: 'Modificou a foto de Policial',
      tipo: 2,
      table: 'policiais',
      fk: id,
      user: idUser
    });
  }


  async relatorio(object:any, idUser: User): Promise<PoliciaisInterface> {
    var policiais;
    
    policiais = await this.policialRepository.find({
      where: { 
        //@ts-ignore
        setor: {
          subunidade: {
            id: object.subunidade
          }
        }
      },
    });

    if(object.setor){
      policiais = policiais.filter(element => {
        return element.setor.id === object.setor;
      });
    }

    if(object.graduacao){
      policiais = policiais.filter(element => {
        return element.graduacao.id === object.graduacao;
      });
    }

    if(object.sexo){
      policiais = policiais.filter(element => {
        if(element.sexo){
          return element.sexo.id === object.sexo;
        }
        
      });
    }

    if(object.transferido){
      policiais = policiais.filter(element => {
        return element.boletim_transferencia !== null;
      });
    }else{
      policiais = policiais.filter(element => {
        return element.boletim_transferencia === null;
      });
    }

    return policiais;
  }
}
