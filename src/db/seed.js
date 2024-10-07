import { Client } from 'pg';

const SQL = `
CREATE TYPE membership_status_enum AS ENUM ('basic', 'premium', 'admin');

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  membership_status membership_status_enum NOT NULL DEFAULT 'basic'
);

CREATE TABLE IF NOT EXISTS messages (
  message_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  user_id INT NOT NULL REFERENCES users(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELETE from messages;
DELETE from users;

INSERT INTO messages (text, username) 
VALUES
  ('Hi there!', 'Susan'),
  ('Hello World!', 'John')
`;

const main = async () => {
  console.log('seeding...');
  const client = new Client();

  try {
    await client.connect();
    await client.query(SQL);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }

  console.log('done');
};

main();
