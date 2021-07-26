import { Injectable } from '@nestjs/common';
import {
  UserValidatorInterface,
  UserInterface,
  InvalidUserException,
} from 'nestjs-oauth2-server';

@Injectable()
export class UserValidator implements UserValidatorInterface {
  async validate(username, password): Promise<UserInterface> {
    // if (users[username] !== undefined && users[username] === password) {
    //   return {
    //     id: users[username],
    //     username: users[username],
    //     email: users[username],
    //   };
    // }
    // if (users[username] !== undefined && users[username] === password) {
    throw InvalidUserException.withUsernameAndPassword(username, password);
    return {
      id: '123',
      username: 'irshaam',
      email: 'mohamed.irshaam@gmail.com',
      //   };
    };
  }
}
