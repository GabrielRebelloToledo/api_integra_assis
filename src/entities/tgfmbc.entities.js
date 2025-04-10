import { EntitySchema } from 'typeorm';


export class TGFMBC {
    constructor(id, token, data) {
        this.id = id;
        this.token = token;
        this.data = data;
    }
}

export default new EntitySchema({
    name: 'TGFMBC',
    target: TGFMBC,

    columns: {
        CODCTABCOCONTRA: { type: 'int', nullable: true },
        ORIGMOV: { type: 'varchar', nullable: true },
        SALDO: { type: 'decimal', nullable: true },
        NUBCOCP: { type: 'int', nullable: true },
        CODPDV: { type: 'int', nullable: true },
        NUCAIXA: { type: 'int', nullable: true },
        NUMTRANSF: { type: 'int', nullable: true },
        DTLANC: { type: 'date', nullable: false },
        CODTIPOPER: { type: 'int', nullable: false },
        NUMDOC: { type: 'int', nullable: true },
        VLRLANC: { type: 'decimal', nullable: false },
        HISTORICO: { type: 'varchar', nullable: true },
        CODCTABCOINT: { type: 'int', nullable: false },
        CODLANC: { type: 'int', nullable: false },
        CODCTABCOINTDEST: { type: 'int', nullable: true },
        CODLANCDEST: { type: 'int', nullable: true },
        CONCILIADO: { type: 'varchar', nullable: false },
        CONCILIADODEST: { type: 'varchar', nullable: true },
        VLRMOEDA: { type: 'decimal', nullable: true },
        VLRLANC_DESTINO: { type: 'decimal', nullable: true },
        RECDESP: { type: 'int', nullable: false },
        NUBCO: { primary: true, type: 'int', generated: false },
        DTINCLUSAO: { type: 'date', nullable: false },
        DHTIPOPER: { type: 'date', nullable: false },
        DTCONTAB: { type: 'date', nullable: true },
        PREDATA: { type: 'datetime', nullable: true },
        DHCONCILIACAO: { type: 'datetime', nullable: true },
        CONTABILIZADO: { type: 'varchar', nullable: true },
        CODUSU: { type: 'int', nullable: false },
        TALAO: { type: 'int', nullable: true },
        DTALTER: { type: 'datetime', nullable: false },
        VLRTROCO: { type: 'decimal', nullable: true },
        VLRCHEQUE: { type: 'decimal', nullable: true },
        NROIMPORT: { type: 'int', nullable: true },


    }
});