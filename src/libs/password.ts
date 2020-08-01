import bcrypt from 'bcrypt';

const hash = async (password: string, rounds = 10) =>
  bcrypt.hash(password, await bcrypt.genSalt(rounds));

const compare = async (password: string, passwordHash: string) =>
  bcrypt.compare(password, passwordHash);

export const Password = { hash, compare };
