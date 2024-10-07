import * as db from '../../db/index.js';

const getAll = () => {
  return db.query('SELECT * FROM messages');
};

const getAuthenticatedMessages = () => {
  return db.query('SELECT * FROM messages JOIN users USING(user_id)');
};

export { getAll, getAuthenticatedMessages };
