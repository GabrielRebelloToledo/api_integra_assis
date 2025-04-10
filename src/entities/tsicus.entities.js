import { EntitySchema } from 'typeorm';


export class TSICUS {
    constructor(id, token, data) {
        this.id = id;
        this.token = token;
        this.data = data;
    }
}

export default new EntitySchema({
    name: 'TSICUS',
    target: TSICUS,

    columns: {
        CODCENCUS: { primary: true, type: 'int', generated: false },
        DESCRCENCUS: { type: 'varchar', nullable: false },
        CALCELALURPARTEA: { type: 'varchar', nullable: true },
        ATIVO: { type: 'varchar', nullable: false },
        ANALITICO: { type: 'varchar', nullable: false },
        VEICULO: { type: 'varchar', nullable: false },
        CODUSURESP: { type: 'int', nullable: false },
        CODPARCRESP: { type: 'int', nullable: true },
        AREA: { type: 'decimal', nullable: true },
        CODUNN: { type: 'int', nullable: true },
        DTINCLUSAO: { type: 'datetime', nullable: true },
        AREAREAL: { type: 'decimal', nullable: true },
        AREACONT: { type: 'decimal', nullable: true },
        AREAPERM: { type: 'decimal', nullable: true },
        CODTAB: { type: 'int', nullable: false },
        FRACGEREN: { type: 'decimal', nullable: true },
        FRACCONT: { type: 'decimal', nullable: true },
        GRAU: { type: 'int', nullable: false },
        CODUNG: { type: 'int', nullable: true },
        CODPARC: { type: 'int', nullable: false },
        CODCENCUSPAI: { type: 'int', nullable: false }
    }
});