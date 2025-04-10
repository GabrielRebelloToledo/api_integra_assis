import bcrypt from 'bcryptjs';

const { compare, genSalt, hash } = bcrypt;

export default class HashProvider {
   async generateHash(payload) {
    const salt = await genSalt();

    return await hash(payload, salt);
  }

   async compareHash(payload, hashed) {
    return await compare(payload, hashed);
  }
}
