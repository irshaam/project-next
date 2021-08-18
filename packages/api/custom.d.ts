// declare namespace Express {
//   export interface User {
//     ability?: any;
//     permissions?: any;
//   }
//   export interface File {
//     name: any;
//   }
// }
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user: any;
  }
}
