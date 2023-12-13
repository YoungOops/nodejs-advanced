import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../models/index.cjs';
import {
  PASSWORD_HASH_SALT_ROUNDS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/security.costant.js';
import * as HttpStatus from '../error/http-status.error.js';

const { Users } = db;

export class AuthController {

  constructor() {
    this.authService = new AuthController();
  }

    signup = async(req, res, next) => {
        try {
            try {
                const { email, password, passwordConfirm, name } = req.body;
            
                if (!email) {
                  return res.status(400).json({
                    success: false,
                    message: '이메일 입력이 필요합니다.',
                  });
                }
            
                if (!password) {
                  return res.status(400).json({
                    success: false,
                    message: '비밀번호 입력이 필요합니다.',
                  });
                }
            
                if (!passwordConfirm) {
                  return res.status(400).json({
                    success: false,
                    message: '비밀번호 확인 입력이 필요합니다.',
                  });
                }
            
                if (!name) {
                  return res.status(400).json({
                    success: false,
                    message: '이름 입력이 필요합니다.',
                  });
                }
            
                if (password !== passwordConfirm) {
                  return res.status(400).json({
                    success: false,
                    message: '입력 한 비밀번호가 서로 일치하지 않습니다.',
                  });
                }
            
                if (password.length < 6) {
                  return res.status(400).json({
                    success: false,
                    message: '비밀번호는 최소 6자리 이상입니다.',
                  });
                }
            
                let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
                const isValidEmail = emailValidationRegex.test(email);
                if (!isValidEmail) {
                  return res.status(400).json({
                    success: false,
                    message: '올바른 이메일 형식이 아닙니다.',
                  });
                }

                const data = await this.authService.signup({ email, name, password });

                return res.status(201).json({
                  success: true,
                  message: '회원가입에 성공했습니다.',
                  data: newUser,
                });
              } catch (error) {
                console.error(error);
                return res.status(500).json({
                  success: false,
                  message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
                });
              }
        }
    } 
}