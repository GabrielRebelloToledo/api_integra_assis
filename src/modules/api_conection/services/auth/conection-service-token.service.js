
import HashCriptoProvider from '../../../../shared/providers/crypto-decrypeted.provider.js';

import TokenLogin from '../../../../entities/token-login.entities.js';
import AppDataSource from '../../../../shared/infra/environments/environments.js';
import AuthService from './AuthService.service.js';

const hashCripto = new HashCriptoProvider();

class ConectionTokenService {

    constructor() {
        this.tokenRepository = AppDataSource.getRepository(TokenLogin);
    }
    async execute() {
            try {
                const token = await AuthService.authenticate({
                    email: process.env.EMAIL_APP,
                    password: process.env.PASSWORD_APP,
                    appKey: process.env.APP_KEY,
                    token: process.env.TOKEN_APP
                });
    
                const TokenSave = await this.RegisterToken(token);

                if(!TokenSave){
                    return {
                        status: 400,
                        message: 'Token não autenticado!',
                        data: null
                    }
                }
                return {
                    status: 200,
                    message: 'Token autenticado com sucesso',
                    data: TokenSave
                };
            } catch (error) {
                console.log("Falha na autenticação: Dados inválidos.");
                return {
                    status: 400,
                    message: 'Falha na autenticação: Dados inválidos',
                    data: null
                };
            }
    }

    async RegisterToken(token) {
        // Criar o novo usuário
        const TokenLogin = this.tokenRepository.create({
            token
        });
        // Salvar no banco
        const TokenLoginCreate = await this.tokenRepository.save(TokenLogin);
        return TokenLoginCreate;
    }

    async getToken() {
        // capturar o TOKEN

        const token = await this.tokenRepository
            .createQueryBuilder('token')
            .orderBy('token.data', 'DESC')
            .getOne();
        if (!token) {
            throw new AppError("Token, não encontrado!", NOT_FOUND);
        }

        return token;
    }
}

export default ConectionTokenService;
