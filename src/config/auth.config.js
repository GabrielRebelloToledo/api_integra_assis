export default {
  jwt: {
    secret: process.env.SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRATION
  },
};

