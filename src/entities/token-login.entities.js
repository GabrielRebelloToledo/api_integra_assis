import { EntitySchema } from 'typeorm';


export class TokenLogin {
    constructor(id,  token, data) {
        this.id = id;
        this.token = token;
        this.data = data;
    }
}

export default new EntitySchema({
    name: 'TokenLogin',
    target: TokenLogin,

    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        token: {
            type: 'text',
        },
        data: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },
        
    }
});