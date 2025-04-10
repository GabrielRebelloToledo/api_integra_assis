import { EntitySchema } from 'typeorm';


export class TGFNAT {
    constructor(id,  token, data) {
        this.id = id;
        this.token = token;
        this.data = data;
    }
}

export default new EntitySchema({
    name: 'TGFNAT',
    target: TGFNAT,
    columns: {
        CODNAT: { primary:true, type: 'int', generated: false },
        DESCRNAT: { type: 'varchar', nullable:false},
        ATIVA: { type: 'varchar', nullable:false},
        ANALITICA: { type: 'varchar', nullable:false},
        INCRESULT: { type: 'varchar', nullable:false},
        CODCTACTB: { type: 'int', nullable:true},
        CODCTACTB2: { type: 'int', nullable:true},
        CODHISTCTB: { type: 'int', nullable:true},
        CODHISTCTB2: { type: 'int', nullable:true},
        GRUPOMKP: { type: 'varchar', nullable:true},
        SUBGRUPOMKP: { type: 'varchar', nullable:true},
        DECVLR: { type: 'int', nullable:true},
        GRAU: { type: 'int', nullable:true},
        CODNATPAI: { type: 'int', nullable:true},
        CODCENCUS: { type: 'int', nullable:true},
        FORMULA: { type: 'varchar', nullable:true},
        CODSERVUNICO: { type: 'int', nullable:true},
        CODGRUPONAT: { type: 'int', nullable:false},
        TIPNAT: { type: 'varchar', nullable:true},
        CSTPIS: { type: 'int', nullable:true},
        CODCTACTBEFD: { type: 'int', nullable:true},
        ALIQPIS: { type: 'decimal', nullable:true},
        CSTCOFINS: { type: 'int', nullable:true},
        ALIQCOFINS: { type: 'decimal', nullable:true},
        NATBCCRED: { type: 'varchar', nullable:true},
        REGIMEEFD: { type: 'varchar', nullable:false},
        GERALCDPR: { type: 'varchar', nullable:true},
        NATEFDCONTM410M810: { type: 'int', nullable:true},
        RECADIANTRURAL: { type: 'varchar', nullable:true},
        
        
    }
});