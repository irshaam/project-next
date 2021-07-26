import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as brcypt from 'bcrypt';
import { toUserDto } from 'src/shared/mapper';

import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<any> {
    // Get user by username
    const user = await this.userService.findByLogin(username);
    console.log(user);
    // Throw error if user is not found
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // compare passwords
    const areEqual = await brcypt.compare(password, user.password);

    // Throw error if user passwords are not equal
    if (!areEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return user
    return toUserDto(user);
  }

  async login(user: any) {
    const expiresIn = '60s';

    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      expiresIn,
    };
    // console.log(payload);
    // const user = await this.validateUser(payload);
    // // Create Signed Token
    // const token = this._createToken(user);
    // return {
    //   email: user.email,
    //   ...token,
    // };
  }

  private _createToken({ email }: { email: string }): any {
    const expiresIn = '60s';
    // const expiresIn = process.env.EXPIRESIN;

    const user: { email: string } = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
