import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePasswords = async (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

export { comparePasswords, hashPassword };
