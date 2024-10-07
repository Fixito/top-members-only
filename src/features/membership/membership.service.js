import * as db from '../../db/index.js';

const update = ({ status, userId }) => {
  return db.query(
    'UPDATE users SET membership_status = $1 WHERE user_id = $2 RETURNING *',
    [status, userId]
  );
};

export { update };
