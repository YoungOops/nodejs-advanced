import bcrypt from 'bcrypt';
import {
  PASSWORD_HASH_SALT_ROUNDS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/security.costant.js';
import db from '../../models/index.cjs';
const { Users } = db;

export class UsersRepository {
  createOn = async ({ email, password, name }) => {
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = (
      await Users.create({ email, password: hashedPassword, name })
    ).toJSON();
    delete newUser.password;
  };

  readOneByEmail = async (email) => {
    const user = await Users.findOne({ where: { email } });
    return user?.toJSON();
  };
}
