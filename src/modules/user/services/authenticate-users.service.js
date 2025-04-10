import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco

import {
    FORBIDDEN,
    UNAUTHORIZED,
} from '../../../shared/infra/constants/http-status-code.constants.js';

import jwt from 'jsonwebtoken';
const { sign } = jwt;
import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import AppErrorTypes from '../../../shared/errors/app-error-types.js';

import User from '../../../entities/user.entities.js'; // Sua entidade de usuário
import authConfig from '../../../config/auth.config.js'; // Arquivo com a configuração do JWT (secret e expiresIn)

import HashProvider from '../../../shared/providers/bcrypt-hash.provider.js';
const hashProvider = new HashProvider();

class AuthenticateUsersService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.userRepository = AppDataSource.getRepository(User);
    }

    async execute({ email, password }) {
        // Valida o usuário e retorna o objeto do usuário
        const user = await this.validateUser(email, password);

        if(user.success == false){
            return { success: false, message: new AppError(AppErrorTypes.sessions.invalidCredentials, UNAUTHORIZED) };
        }
        // Gera o token JWT para o usuário
        const token = this.generateToken(user);

        // Retorna o token JWT
        return { token };
    }

    async validateUser(email, password) {
        const user = await this.userRepository.findOneBy({ email });

        if (!user) {
            return { success: false, message: new AppError(AppErrorTypes.sessions.invalidCredentials, UNAUTHORIZED) };
        }

        const pass = await this.checkPassword(password, user);
        if (pass) {
            return { success: false, message: new AppError(AppErrorTypes.sessions.invalidCredentials, UNAUTHORIZED) };
        }
        //this.checkUserFeatures(user);

        return user;
    }

    /* checkUserFeatures(user) {
        if (!user.featureGroup || !user.featureGroup.features || !user.featureGroup.features.length) {
            throw new AppError(
                'User is missing feature group permissions',
                FORBIDDEN,
            );
        }
    } */

    async checkPassword(password, user) {

        const passwordMatch = await hashProvider.compareHash(password, user.password);
        if (!passwordMatch) {
            return true;
        }
    }

    generateToken(user) {
        const { secret, expiresIn } = authConfig.jwt;

        /* console.log(secret)
        console.log(expiresIn)
        console.log(user) */
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn,
            algorithm: 'HS512', // Exemplo de algoritmo, ajuste conforme necessário
        });

        return `Bearer ${token}`;
    }
}

export default AuthenticateUsersService;
