import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../models/index.cjs';
import {
  PASSWORD_HASH_SALT_ROUNDS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/security.costant.js';
import * as HttpStatus from '../errors/http-status.error.js';
import { UsersRepository } from '../repositories/users.repository.js';
const { Users } = db;

export class AuthService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }
  signup = async ({ email, name, password }) => {
    const existedUser = await this.usersRepository.readOneByEmail(email);

    if (existedUser) {
      throw new HttpStatus.BadRequest('이미 가입 된 이메일');
    }

    // const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = await this.usersRepository.createOne({
      email,
      password,
      name,
    });
    // (
    //   await Users.create({ email, password: hashedPassword, name })
    // ).toJSON();
    // delete newUser.password;

    return newUser;
  };
}
