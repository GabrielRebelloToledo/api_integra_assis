import fetch from 'node-fetch';

class AuthService {
    constructor() {
        this.apiUrl = `https://api.sankhya.com.br`
    }

    async authenticate({ email, password, appKey, token }) {
        try {
            const response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    username: email,                      // Envia o email no header
                    password: password,                // Envia a senha no header
                    appkey: appKey,                    // Envia o appKey no header
                    token: token                       // Envia o token no header
                }
            });

            if (!response.ok) {

                const responseBody = await response.json();
               
                return(`Erro ao autenticar: ${responseBody.error ? responseBody.error.descricao : 'Erro desconhecido'}`);
            }

            const data = await response.json();
            //console.log('Token Recebido:', data.bearerToken); // Assumindo que a resposta contém um campo 'token'
            return data.bearerToken;
        } catch (error) {
            console.error('Erro ao autenticar:', error);
            throw error;
        }
    }
}


export default new AuthService();
