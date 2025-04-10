import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco

import {
    FORBIDDEN,
    UNAUTHORIZED,
} from '../../../../shared/infra/constants/http-status-code.constants.js';

import jwt from 'jsonwebtoken';
const { sign } = jwt;


import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import User from '../../../../entities/user.entities.js'; // Sua entidade de usuário
import authConfig from '../../../../config/auth.config.js'; // Arquivo com a configuração do JWT (secret e expiresIn)

class DeleteUsersService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.userRepository = AppDataSource.getRepository(User);
    
    }

     async execute(id) {
       
        await this.userRepository.delete({ id: id });
      }

   
}

export default DeleteUsersService;
