import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUserRepository';

type Request = {
  email: string;
  password: string;
};

type Response = {
  access_token: string;
};

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: Request): Promise<Response> {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email or password invalid');
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error('Email or password invalid');
    }

    const token = sign({}, '2b246fb4a2e07344cebe1e7d3150e4e0', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      access_token: token,
    };
  }
}
