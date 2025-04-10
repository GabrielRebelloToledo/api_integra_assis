import express from 'express';
import IntegrationsController from '../controllers/integration-tables.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const integrationRoutes = express.Router();

/* Comercial */
integrationRoutes.post(
    '/nota',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createCabecalhoNota
);
integrationRoutes.post(
    '/item',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createItemNota
);
integrationRoutes.post(
    '/natureza',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createNaturezaFinanceira
);
integrationRoutes.post(
    '/centrocusto',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createCentroCusto
);
integrationRoutes.post(
    '/empresa',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createEmpresa
);
/* Financeiro */
integrationRoutes.post(
    '/financeiro',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createFinanceiro
);

integrationRoutes.post(
    '/movimento-bancario',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createMovimentoBancario
);

integrationRoutes.post(
    '/contas',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createContas
);

integrationRoutes.post(
    '/banco',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createBancos
);

/* Parceiro */
integrationRoutes.post(
    '/parceiros',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createParceiro

);

/* Produto */
integrationRoutes.post(
    '/produtos',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createProduto

);

/* Negociação */
integrationRoutes.post(
    '/negociacao',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createTipoNegociacao

);








integrationRoutes.post(
    '/movimento-bancario',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    IntegrationsController.createParceiro
);


export default integrationRoutes;