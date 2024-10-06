import * as db from '../../db/index.js';
import { hashPassword } from '../../utils/password.utils.js';

const register = async (data) => {
  const { firstName, lastName, email, password } = data;

  const hashedPassword = await hashPassword(password);

  return db.query(
    'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [firstName, lastName, email, hashedPassword]
  );
};

const login = async (data) => {
  const { email, password } = data;
  return db.query('SELECT * FROM users WHERE email = $1', [email]);
};

export { register };
