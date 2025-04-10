import 'dotenv/config';  // Carregar as variáveis do arquivo .env
// Importando o TypeORM
import { DataSource } from 'typeorm';
import fs from 'fs';
import https from 'https';


const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, //rodar criação de tabela automatica
    logging: false,
    entities: ["src/entities/*{.js,.ts}"],
    migrations: ["src/migrations/*{.js,.ts}"], // Caminho para suas migrations
    cli: {
        migrationsDir: "src/migrations" // Diretório onde as migrations serão criadas
    }
});

// Função para inicializar o banco de dados
export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Conexão estabelecida com sucesso!');
        
    } catch (err) {
        console.error('Erro na conexão:', err);
        process.exit(1);
    }
};


const options = {
    key: fs.readFileSync('cantina.pem'),  // Rota para o arquivo PEM combinado (chave privada e certificado)
    cert: fs.readFileSync('cantina.pem'), // Rota para o arquivo PEM combinado (chave privada e certificado)
};

// Função para iniciar o servidor
export const startServer = (app) => {
    const port = process.env.PORT || 3000;

    console.log(process.env.SERVER)

    if (process.env.SERVER == "HTTP") {
        app.listen(port, () => {
            console.log(`Servidor rodando HTTP na porta ${port}`);
        });

    } else {
        const server = https.createServer(options, app);
        // Ouvir
        server.listen(port, () => {
            console.log(`Servidor rodando HTTPS na porta ${port}`);
        });

    }

};

export default AppDataSource;
