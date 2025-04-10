import HashCriptoProvider from '../../../../shared/providers/crypto-decrypeted.provider.js';

import TGFITE from '../../../../entities/tgfite.entities.js';
import AppDataSource from '../../../../shared/infra/environments/environments.js';
import LoadViewCount from '../consultas/LoadViewCountTable.service.js';
import LoadsRecords from '../consultas/LoadsRecordsService.service.js';
import { container } from 'tsyringe';

import fieldTGFITE from '../fields/tgfite.field.js'

class IntegrationServiceTGFITE {
    constructor() {

        this.getRepositoryEtities = AppDataSource.getRepository(TGFITE);
    }

    async execute() {
        const service = container.resolve(LoadViewCount);
        const registro = await service.recordsViewCount();

        let qtdepaginas = 1
        if (registro.qtitens > 0) {
            qtdepaginas = registro.qtitens;
        }
        const serviceLoad = container.resolve(LoadsRecords);

        console.log("Excluindo TGFITE")
        await this.getRepositoryEtities.delete({});

        console.log("Adicionando TGFITE")
        try{for (let i = 0; i <= qtdepaginas; i++) {

            try {

                const registroLoad = await serviceLoad.records('ItemNota', i, fieldTGFITE.join(','));
                // Garantindo que existem registros antes de processar
                console.log(`Página ${i + 1} / ${Number(qtdepaginas)+1}`);

                if (!registroLoad || registroLoad.length === 0) {
                    console.log(`Nenhum registro encontrado na página ${i + 1}`);
                    continue;
                }

                //console.log(registroLoad)
                    for (const registro of registroLoad) {
                        const data = {};
                    
                        fieldTGFITE.forEach((field, index) => {
                            //data[field] = registro[`f${index}`]?.["$"] || "N/A";
                            const valorBruto = registro[`f${index}`]?.["$"] || "N/A";
                            data[field] = this.tratarValor(valorBruto);
                        });
                        const registros = this.getRepositoryEtities.create(data);
                        await this.getRepositoryEtities.save(registros);
                        //console.log(`Cliente salvo: ${data.CODPARC} - ${data.RAZAOSOCIAL} - ${data.NOMEPARC}`);
                    }

            } catch (error) {
                console.error(`Erro ao processar página ${i + 1}:`, error);
            }

        }
            return { status: 200, message: "" }
        }catch(err){
            return { status: 400, message: err }
        }
        

    }
    tratarValor(valor) {
        if (!valor || valor === 'N/A') return null;

        // Detecta se é uma data no formato DD/MM/YYYY HH:mm:ss
        const regexDataBR = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;

        if (regexDataBR.test(valor)) {
            const [data, hora] = valor.split(' ');
            const [dia, mes, ano] = data.split('/');
            const dataISO = `${ano}-${mes}-${dia}T${hora}`;
            const dataValida = new Date(dataISO);
            return isNaN(dataValida) ? null : dataISO.replace('T', ' ');
        }

        // Se não for data, apenas retorna o valor original
        return valor;
    }

}

export default IntegrationServiceTGFITE;
