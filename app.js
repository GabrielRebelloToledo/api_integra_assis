
import express from 'express';
import helmet from 'helmet';
import { initializeDatabase, startServer } from './src/shared/infra/environments/environments.js';  // Importa funções de server.js

// Rotas iniciais

import userSessions from './src/modules/user/routes/sessions.routes.js';

//Conexões API

import conectionTokenRoutes from './src/modules/api_conection/routes/conection-token.routes.js';
import integrationRoutes from './src/modules/api_conection/routes/integration.routes.js';


import productsRoutes from './src/modules/products/routes/products.routes.js';

import corsConfig from './src/config/cors.config.js';


import cors from 'cors';

import { startIntegracao, startIntegracaoManual } from './src/modules/api_conection/scheduler/scheduler.js';

const app = express();


//Iniciando o JOB
//startIntegracao();
//startIntegracaoManual();


app.use(cors(corsConfig));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Olá, Mundo!');
});

app.use(
    helmet({
        contentSecurityPolicy: false, // Desativa CSP
        frameguard: {
            action: 'deny', // Bloqueia frames de qualquer origem
        },
    })
);

app.use('/sessions', userSessions);
app.use('/conection', conectionTokenRoutes);
app.use('/integrar', integrationRoutes);
app.use('/get-products', productsRoutes);


// Inicializar o banco de dados
initializeDatabase();
// Iniciar o servidor
startServer(app);

