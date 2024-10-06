import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

export const query = (text, params) => {
  return pool.query(text, params);
};
