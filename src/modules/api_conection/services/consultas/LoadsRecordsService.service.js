import ConectionTokenService from '../auth/conection-service-token.service.js';
import { container } from 'tsyringe';

class LoadsRecords {
    constructor() {
        this.apiUrl = `https://api.sankhya.com.br/gateway/v1/mge/service.sbr?serviceName=CRUDServiceProvider.loadRecords&outputType=json`;
        this.token = null;  // Token salvo na instância da classe
    }

    async getToken() {
        // Se já tiver um token salvo, retorna ele
        if (this.token) {
            console.log("Token reutilizado.");
            return this.token;
        }

        // Caso não tenha token, gera um novo
        const conection = container.resolve(ConectionTokenService);
        const registro = await conection.getToken();
        this.token = registro.token;  // Salva o token na instância
        console.log("Token gerado e salvo.");
        return this.token;
    }

    async records(baseTable, page, fields) {

        //criterio = { "expression": { "$": "this.CLIENTE = 'S'" } };
        let criterio = {};
        let orderby = "";

        try {

            if (baseTable == "Produto") {
                criterio = {};
                orderby = "CODPROD ASC"
            } 
            else if (baseTable == "Parceiro") {
                criterio = {};
                orderby = "CODPARC ASC"
            }

            /* console.log(JSON.stringify({
                "serviceName": "CRUDServiceProvider.loadRecords",
                "requestBody": {
                    "dataSet": {
                        "rootEntity": baseTable,
                        "includePresentationFields": "N",
                        "offsetPage": page || "0",
                        "criteria": criterio,
                        "orderByExpression": orderby,
                        "entity": {
                            "fieldset": {
                                "list": fields
                            }
                        }
                    }
                }
            })); */


            const token = await this.getToken();  // Reutiliza o token se disponível

            const response = await fetch(`${this.apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "serviceName": "CRUDServiceProvider.loadRecords",
                    "requestBody": {
                        "dataSet": {
                            "rootEntity": baseTable,
                            "includePresentationFields": "N",
                            "offsetPage": page || "0",
                            "criteria": criterio,
                            "orderByExpression": orderby,
                            "entity": {
                                "fieldset": {
                                    "list": fields
                                }
                            }
                        }
                    }
                })
            });

            const responseBody = await response.json();
            // Verificar se o caminho de acesso existe
            if (
                responseBody?.responseBody?.entities?.entity &&
                Array.isArray(responseBody.responseBody.entities.entity)
            ) {
                /*  console.log("Registros encontrados:", responseBody.responseBody.entities.entity); */
                return responseBody.responseBody.entities.entity;
            } else {
                console.error("Nenhum dado encontrado ou formato inesperado.");
            }


        } catch (error) {
            console.error('Erro ao buscar registros:', error);
            throw error;
        }
    }
}

export default LoadsRecords;
