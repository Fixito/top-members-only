import jwt from 'jsonwebtoken';

const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
  });

export { createAccessToken };
