import HashCriptoProvider from '../../../../shared/providers/crypto-decrypeted.provider.js';

import TSIBCO from '../../../../entities/tsibco.entities.js';
import AppDataSource from '../../../../shared/infra/environments/environments.js';
import LoadViewCount from '../consultas/LoadViewCountTable.service.js';
import LoadsRecords from '../consultas/LoadsRecordsService.service.js';
import { container } from 'tsyringe';
import fieldTSIBCO from '../fields/tsibco.field.js'
class IntegrationServiceTSICTA {
    constructor() {

        this.getRepositoryEtities = AppDataSource.getRepository(TSIBCO);
    }

    async execute() {
        const service = container.resolve(LoadViewCount);
        const registro = await service.recordsViewCount();

        let qtdepaginas = 1
        if (registro.qtbco > 0) {
            qtdepaginas = registro.qtbco;
        }
        const serviceLoad = container.resolve(LoadsRecords);

        console.log("Excluindo TSIBCO")
        await this.getRepositoryEtities.delete({});

        console.log("Adicionando TSIBCO")
        try {
            for (let i = 0; i <= qtdepaginas; i++) {

                try {




                    const registroLoad = await serviceLoad.records('Banco', i, fieldTSIBCO.join(','));
                    // Garantindo que existem registros antes de processar
                    console.log(`Página ${i + 1} / ${Number(qtdepaginas) + 1}`);
                    if (!registroLoad || registroLoad.length === 0) {
                        console.log(`Nenhum registro encontrado na página ${i + 1}`);
                        continue;
                    }

                    //console.log(registroLoad)
                    for (const registro of registroLoad) {
                        const data = {};

                        fieldTSIBCO.forEach((field, index) => {
                            //data[field] = registro[`f${index}`]?.["$"] || "N/A";
                            const valorBruto = registro[`f${index}`]?.["$"] || "N/A";
                            data[field] = this.tratarValor(valorBruto);
                        });
                        // Cria o registro no banco de dados
                        const registros = this.getRepositoryEtities.create(data);
                        await this.getRepositoryEtities.save(registros);
                        //console.log(`Cliente salvo: ${data.CODPARC} - ${data.RAZAOSOCIAL} - ${data.NOMEPARC}`);
                    }

                } catch (error) {
                    console.error(`Erro ao processar página ${i + 1}:`, error);
                }

            }
            return { status: 200, message: "" }
        } catch (err) {
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

export default IntegrationServiceTSICTA;
