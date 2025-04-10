import { EntitySchema } from 'typeorm';


export class User {
  constructor(id, name, email, password, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}

export default new EntitySchema({
  name: 'User',
  target: User,

  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
    type: {
      type: 'varchar',
    },
  }
});