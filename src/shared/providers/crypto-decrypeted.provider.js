import crypto from 'crypto';

export default class HashCriptoProvider {


    constructor() {
        // Definindo uma chave e IV fixos para exemplo (em produção, armazene-os de forma segura)
        this.algorithm = 'aes-256-cbc';
        this.iv = crypto.randomBytes(16);  // IV aleatório por criptografia
    }

    async generateCriptoHash(payload, keyapp) {
        
        const key = crypto.scryptSync(keyapp, 'salt', 32);
        const iv = this.iv;
        const cipher = crypto.createCipheriv(this.algorithm, key, this.iv);
        let encrypted = cipher.update(payload, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return { encrypted, iv: iv.toString('hex') };

    }

    async decriptedCriptoHash(payload, iv, keyapp) {

        const key = crypto.scryptSync(keyapp, 'salt', 32);
        const decipher = crypto.createDecipheriv(this.algorithm, key, Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(payload, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;

    }




}
