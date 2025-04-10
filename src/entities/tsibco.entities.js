import { EntitySchema } from 'typeorm';


export class TSIBCO {
    constructor(id, token, data) {
        this.id = id;
        this.token = token;
        this.data = data;
    }
}

export default new EntitySchema({
    name: 'TSIBCO',
    target: TSIBCO,

    columns: {
        CODBCO: { primary: true, type: 'int', generated: false },
        ABREVIATURA: { type: 'varchar', nullable: false },
        NOMEBCO: { type: 'varchar', nullable: false },
        CTACMC7INI: { type: 'int', nullable: true },
        CTACMC7FIM: { type: 'int', nullable: true }
    }
});