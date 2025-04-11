import cron from 'node-cron';
import { container } from 'tsyringe';
import ConectionTokenController from '../services/auth/conection-service-token.service.js';

const conection = new ConectionTokenController();

/* PARCEIROS */
import IntegrationServiceTGFPAR from '../services/parceiros/integration-save-TGFPAR.service.js';


/* PRODUTOS */

import IntegrationServiceTGFPRO from '../services/produtos/integration-save-TGFPRO.service.js';

/* COMERCIAL */

import IntegrationServiceTGFCAB from '../services/comercial/integration-save-TGFCAB.service.js';
import IntegrationServiceTGFITE from '../services/comercial/integration-save-TGFITE.service.js';
import IntegrationServiceTGFNAT from '../services/comercial/integration-save-TGFNAT.service.js';
import IntegrationServiceTSICUS from '../services/comercial/integration-save-TSICUS.service.js';
import IntegrationServiceTSIEMP from '../services/comercial/integration-save-TSIEMP.service.js';

/* FINANCEIRO */

import IntegrationServiceTGFFIN from '../services/financeiro/integration-save-TGFFIN.service.js';
import IntegrationServiceTGFMBC from '../services/financeiro/integration-save-TGFMBC.service.js';
import IntegrationServiceTSIBCO from '../services/financeiro/integration-save-TSIBCO.service.js';
import IntegrationServiceTSICTA from '../services/financeiro/integration-save-TSICTA.service.js';

/* NEGOCIAÇÃO */

import IntegrationServiceTGFTPV from '../services/negociacao/integration-save-TGFTPV.service.js';

export function startIntegracao() {
    cron.schedule('32 22 * * *', async () => {
        console.log(`🔁 Tarefa executada às: ${new Date().toLocaleTimeString()}`);
        try {
            console.log("Iniciando o Agendador de Integração!");
            await getAutorizathion(integracoesEmSequencia);
        } catch (err) {
            console.error('❌ Erro durante carga programada:', err);
        }
    });
}

export async function startIntegracaoManual() {
    try {
        await getAutorizathion(integracoesEmSequencia);
    } catch (err) {
        console.error('❌ Erro ao iniciar integração manual:', err);
    }
}

async function getAutorizathion(callback) {

    const retorno = await conection.execute();

    if (retorno.status === 200) {
        console.log('🔐 Autenticado com sucesso');
        await callback(); // Executa as integrações após autenticar
    } else {
        console.warn('⚠️ Falha na autenticação');
    }
}

// Integrações executadas em ordem
async function integracoesEmSequencia() {

    /* Processos Pesados */
     /*  await integrandoCabecalhoNota();
    await integrandoItemNota(); */

    await integrandoParceiro();
    await integrandoProduto();
    await integrandoFinanceiro();
    await integrandoMovimentoBancario()
    /* Processos Leves */
    await integrandoTipoNegociacao();
    await integrandoBancos();
    await integrandoContas();
    await integrandoNaturezaFinanceira();
    await integrandoCentroCusto();
    await integrandoEmpresa();
}

async function integrandoParceiro() {

    const conection = container.resolve(IntegrationServiceTGFPAR);
    const result = await conection.execute();
    logResultado('Parceiro', result);

}


/* Serviço Pasta Produtos */
async function integrandoProduto(request, response) {

    const conection = container.resolve(IntegrationServiceTGFPRO);
    const result = await conection.execute();
    logResultado('Produto', result);

}

/* Serviço Pasta Negociação */
async function integrandoTipoNegociacao(request, response) {

    const conection = container.resolve(IntegrationServiceTGFTPV);
    const result = await conection.execute();
    logResultado('Tipo de Negociação', result);

}

/* Serviço Pasta Financeiro */

async function integrandoFinanceiro(request, response) {

    const conection = container.resolve(IntegrationServiceTGFFIN);
    const result = await conection.execute();
    logResultado('Financeiro', result);

}
async function integrandoMovimentoBancario() {

    const conection = container.resolve(IntegrationServiceTGFMBC);
    const result = await conection.execute();
    logResultado('Movimento Bancário', result);

}

async function integrandoBancos() {

    const conection = container.resolve(IntegrationServiceTSIBCO);
    const result = await conection.execute();
    logResultado('Banco', result);

}
async function integrandoContas() {

    const conection = container.resolve(IntegrationServiceTSICTA);
    const result = await conection.execute();
    logResultado('Conta', result);

}


/* Serviço Pasta Comercial */

async function integrandoCabecalhoNota() {

    const conection = container.resolve(IntegrationServiceTGFCAB);
    const result = await conection.execute();
    logResultado('Notas', result);

}

async function integrandoItemNota() {

    const conection = container.resolve(IntegrationServiceTGFITE);
    const result = await conection.execute();
    logResultado('Itens Notas', result);

}
async function integrandoNaturezaFinanceira() {

    const conection = container.resolve(IntegrationServiceTGFNAT);
    const result = await conection.execute();
    logResultado('Natureza Financeira', result);

}

async function integrandoCentroCusto() {

    const conection = container.resolve(IntegrationServiceTSICUS);
    const result = await conection.execute();
    logResultado('Centro de Resultado', result);

}

async function integrandoEmpresa() {

    const conection = container.resolve(IntegrationServiceTSIEMP);
    const result = await conection.execute();
    logResultado('Empresa', result);
}


function logResultado(nome, result) {
    if (result.status === 200) {
        console.log(`✅ Integração de ${nome} concluída`);
    } else {
        console.warn(`⚠️ Falha na integração de ${nome}`, result);
    }
}