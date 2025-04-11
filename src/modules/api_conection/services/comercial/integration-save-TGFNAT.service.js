import HashCriptoProvider from '../../../../shared/providers/crypto-decrypeted.provider.js';

import TGFNAT from '../../../../entities/tgfnat.entities.js';
import AppDataSource from '../../../../shared/infra/environments/environments.js';
import LoadViewCount from '../consultas/LoadViewCountTable.service.js';
import LoadsRecords from '../consultas/LoadsRecordsService.service.js';
import { container } from 'tsyringe';

import fieldTGFNAT from '../fields/tgfnat.field.js'

class IntegrationServiceTGFNAT {
    constructor() {

        this.getRepositoryEtities = AppDataSource.getRepository(TGFNAT);
    }

    async execute() {
        const service = container.resolve(LoadViewCount);
        const registro = await service.recordsViewCount();
        let qtdepaginas = 1
        if (registro.qtnat > 0) {
            qtdepaginas = registro.qtnat;
        }
        const serviceLoad = container.resolve(LoadsRecords);

        console.log("Excluindo Natureza")
        await this.getRepositoryEtities.delete({});

        console.log("Adicionando Natureza")
        try {
            for (let i = 0; i <= qtdepaginas; i++) {

                try {


                    const registroLoad = await serviceLoad.records('Natureza', i, fieldTGFNAT.join(','));
                    // Garantindo que existem registros antes de processar
                    console.log(`Página ${i + 1} / ${Number(qtdepaginas) + 1}`);
                    if (!registroLoad || registroLoad.length === 0) {
                        console.log(`Nenhum registro encontrado na página ${i + 1}`);
                        continue;
                    }

                    //console.log(registroLoad)
                    for (const registro of registroLoad) {
                        const data = {};

                        fieldTGFNAT.forEach((field, index) => {
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
        } catch (err) {
            return { status: 400, message: err }
        }


    }
    tratarValor(valor) {
        if (!valor || valor === 'N/A') return null;

        // Detecta formato com hora: DD/MM/YYYY HH:mm:ss
        const regexDataHora = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;

        // Detecta formato só com data: DD/MM/YYYY
        const regexDataSimples = /^\d{2}\/\d{2}\/\d{4}$/;

        if (regexDataHora.test(valor)) {
            const [data, hora] = valor.split(' ');
            const [dia, mes, ano] = data.split('/');
            const iso = `${ano}-${mes}-${dia}T${hora}`;
            const date = new Date(iso);
            return isNaN(date) ? null : iso.replace('T', ' ');
        }

        if (regexDataSimples.test(valor)) {
            const [dia, mes, ano] = valor.split('/');
            const iso = `${ano}-${mes}-${dia}`;
            const date = new Date(iso);
            return isNaN(date) ? null : iso;
        }

        return valor;
    }
}

export default IntegrationServiceTGFNAT;
