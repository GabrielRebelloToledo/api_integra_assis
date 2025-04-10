import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT } from '../../../shared/infra/constants/http-status-code.constants.js';

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

class IntegrationsController {

/* Serviço Pasta Parceiros */
 async createParceiro(request, response) {

    const conection = container.resolve(IntegrationServiceTGFPAR);
    const registro = await conection.execute();
    return response.json(registro);
  } 

/* Serviço Pasta Produtos */
  async createProduto(request, response) {

    const conection = container.resolve(IntegrationServiceTGFPRO);
    const registro = await conection.execute();
    return response.json(registro);

  }

/* Serviço Pasta Negociação */
async createTipoNegociacao(request, response) {

  const conection = container.resolve(IntegrationServiceTGFTPV);
  const registro = await conection.execute();
  return response.json(registro);

}

/* Serviço Pasta Financeiro */

async createFinanceiro(request, response) {

  const conection = container.resolve(IntegrationServiceTGFFIN);
  const registro = await conection.execute();
  return response.json(registro);

}
async createMovimentoBancario(request, response) {

  const conection = container.resolve(IntegrationServiceTGFMBC);
  const registro = await conection.execute();
  return response.json(registro);

}

async createBancos(request, response) {

  const conection = container.resolve(IntegrationServiceTSIBCO);
  const registro = await conection.execute();
  return response.json(registro);

}
async createContas(request, response) {

  const conection = container.resolve(IntegrationServiceTSICTA);
  const registro = await conection.execute();
  return response.json(registro);

}


/* Serviço Pasta Comercial */

  async createCabecalhoNota(request, response) {

    const conection = container.resolve(IntegrationServiceTGFCAB);
    const registro = await conection.execute();
    return response.json(registro);

  }

  async createItemNota(request, response) {

    const conection = container.resolve(IntegrationServiceTGFITE);
    const registro = await conection.execute();
    return response.json(registro);

  }
  async createNaturezaFinanceira(request, response) {

    const conection = container.resolve(IntegrationServiceTGFNAT);
    const registro = await conection.execute();
    return response.json(registro);

  }

  async createCentroCusto(request, response) {

    const conection = container.resolve(IntegrationServiceTSICUS);
    const registro = await conection.execute();
    return response.json(registro);

  }

  async createEmpresa(request, response) {

    const conection = container.resolve(IntegrationServiceTSIEMP);
    const registro = await conection.execute();
    return response.json(registro);

  }
}

export default new IntegrationsController();

