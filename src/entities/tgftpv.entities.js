import { EntitySchema } from 'typeorm';


export class TGFTPV {
    constructor(id, token, data) {
        this.id = id;
        this.token = token;
        this.data = data;
    }
}

export default new EntitySchema({
    name: 'TGFTPV',
    target: TGFTPV,

    columns: {
        CODTIPVENDA: { primary: true, type: 'int', generated: false },
        TIMQTDPARC: { type: 'int', nullable: true },
        POSSUISIMSALVA: { type: 'varchar', nullable: true },
        DESCRTIPVENDA: { type: 'varchar', nullable: false },
        EXVENDAMAIS: { type: 'varchar', nullable: true },
        ATIVO: { type: 'varchar', nullable: false },
        SUBTIPOVENDA: { type: 'varchar', nullable: false },
        BASEPRAZO: { type: 'int', nullable: true },
        VENDAMIN: { type: 'decimal', nullable: true },
        VENDAMAX: { type: 'decimal', nullable: true },
        COMPRAMAX: { type: 'decimal', nullable: true },
        COMISSAO: { type: 'decimal', nullable: true },
        GRUPOAUTOR: { type: 'varchar', nullable: true },
        SOMAPRAZOCLIENTE: { type: 'varchar', nullable: false },
        VALPRAZOCLIENTE: { type: 'varchar', nullable: false },
        FIXAVENC: { type: 'varchar', nullable: false },
        PODECONSUMIDOR: { type: 'varchar', nullable: false },
        CODTAB: { type: 'int', nullable: true },
        NUNOTA: { type: 'int', nullable: true },
        EMITEBOLETA: { type: 'varchar', nullable: false },
        CODTCF: { type: 'int', nullable: true },
        CODOBSPADRAO: { type: 'int', nullable: true },
        PRAZOMEDMAX: { type: 'int', nullable: true },
        PRAZOMAX: { type: 'int', nullable: true },
        LUCROMIN: { type: 'decimal', nullable: true },
        MARGEMMIN: { type: 'decimal', nullable: true },
        CODFORMDESCMAX: { type: 'int', nullable: true },
        CODFORMDESCMAXITENS: { type: 'int', nullable: true },
        DESCPROM: { type: 'varchar', nullable: true },
        DESCMAX: { type: 'decimal', nullable: true },
        TAXAJURO: { type: 'decimal', nullable: true },
        TIPTAXA: { type: 'varchar', nullable: true },
        TIPJURO: { type: 'varchar', nullable: true },
        CODCTACTB_1: { type: 'int', nullable: true },
        CODCTACTB_2: { type: 'int', nullable: true },
        PERCMINENTRADA: { type: 'decimal', nullable: true },
        PRAZOMAXPRIPARC: { type: 'int', nullable: true },
        NROPARCELAS: { type: 'int', nullable: true },
        DHALTER: { primary: true, type: 'varchar', generated: false },
        APRESTRANSP: { type: 'varchar', nullable: false },
        EMITEDUPL: { type: 'varchar', nullable: false },
        FLEX: { type: 'varchar', nullable: false },
        BAIXA: { type: 'varchar', nullable: false },
        CODUSU: { type: 'int', nullable: false },
        MODELOPGTO: { type: 'varchar', nullable: false },
        TAXAJURSIM: { type: 'decimal', nullable: true },
        TIPOJURSIM: { type: 'varchar', nullable: true },
        PRAZOMIN: { type: 'int', nullable: true },
        EDITASIMULACAO: { type: 'varchar', nullable: false },
        TXPARCADM: { type: 'decimal', nullable: true },
        INTEGRAECONECT: { type: 'varchar', nullable: false },
        FORMARECBTOSOCIN: { type: 'int', nullable: true },
        VENCPREFIXPED: { type: 'varchar', nullable: true },
        FASTUSA: { type: 'varchar', nullable: false },
        ARREDPRIMEIRAPARC: { type: 'varchar', nullable: true },
        TRUNCPARCELA: { type: 'varchar', nullable: true }
    }
});