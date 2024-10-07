import * as db from '../../db/index.js';

const getAll = () => {
  return db.query('SELECT * FROM messages');
};

const getAuthenticatedMessages = () => {
  return db.query('SELECT * FROM messages JOIN users USING(user_id)');
};

const create = ({ data, userId }) => {
  const { title, message } = data;
  return db.query(
    'INSERT INTO messages ( title, message, user_id) VALUES ($1, $2, $3) RETURNING *',
    [title, message, userId]
  );
};

const remove = (id) => {
  return db.query(
    'DELETE FROM messages WHERE message_id = $1 RETURNING *',
    [id]
  );
};

export { create, getAll, getAuthenticatedMessages, remove };
