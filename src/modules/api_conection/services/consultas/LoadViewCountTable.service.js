import { container } from 'tsyringe';
import ConectionTokenService from '../auth/conection-service-token.service.js';


class LoadViewCount {

    constructor() {
        this.apiUrl = `https://api.sankhya.com.br/gateway/v1/mge/service.sbr?serviceName=CRUDServiceProvider.loadView&outputType=json`
    }

    async recordsViewCount() {

        const conection = container.resolve(ConectionTokenService);
        const registro = await conection.getToken();
        const token = registro.token;
        try {
            const response = await fetch(`${this.apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "serviceName": "CRUDServiceProvider.loadView",
                    "requestBody": {
                        "query": {
                            "viewName": "QTDS_TABLES",
                            "fields": {
                                "field": {
                                    "$": "QTPARC, QTPROD, QTFIN, QTMBC, QTNAT, QTCAB, QTITE, QTTIPV, QTEMP,QTCCUS, QTCTA, QTBCO "
                                }
                            }
                        }
                    }
                })
            });

            const responseBody = await response.json();
            //console.log(responseBody)

            if (responseBody.statusMessage === "Não autorizado.") {
                stop;
                return;
            }
            /* console.log("Resposta completa:", responseBody); */

            if (!response.ok) {
                return `Erro ao autenticar: ${responseBody.error ? responseBody.error.descricao : 'Erro desconhecido'}`;
            }
            //console.log(responseBody.responseBody.records.record)
            // Acessando os valores de QTPROD e QTPARC
            const record = responseBody.responseBody.records.record;
            const qtprod = record.QTPROD["$"];
            const qtparc = record.QTPARC["$"];
            const qtfin = record.QTFIN["$"];
            const qtmbc = record.QTMBC["$"];
            const qtnat = record.QTNAT["$"];
            const qtcab = record.QTCAB["$"];
            const qtitens = record.QTITE["$"];
            const qtvenda = record.QTTIPV["$"];
            const qtemp = record.QTEMP["$"];
            const qtccus = record.QTCCUS["$"];
            const qtcta = record.QTCTA["$"];
            const qtbco = record.QTBCO["$"];

            return { qtprod, qtparc, qtfin, qtmbc, qtnat, qtcab, qtitens, qtvenda, qtemp, qtccus, qtcta, qtbco };

        } catch (error) {
            console.error('Erro ao autenticar:', error);
            throw error;
        }
    }


}


export default LoadViewCount;
