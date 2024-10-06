import * as db from '../../db/index.js';

const getByEmail = async (email) => {
  return db.query('SELECT * FROM users WHERE email = $1', [email]);
};

export { getByEmail };
