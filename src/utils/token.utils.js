import jwt from 'jsonwebtoken';

const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
  });

const verifyToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

export { createAccessToken, verifyToken };
