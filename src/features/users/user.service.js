import * as db from '../../db/index.js';

const findByEmail = async (email) => {
  return db.query('SELECT * FROM users WHERE email = $1', [email]);
};

export { findByEmail };
