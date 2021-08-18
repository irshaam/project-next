import { unpackRules } from "@casl/ability/extra";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";

const providers = [
  Providers.Credentials({
    name: "credentials",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
    },

    async authorize(credentials): Promise<any> {
      try {
        const user = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          credentials
          // {
          //   user: {
          //     password: credentials.password,
          //     email: credentials.email,
          //   },
          // },
          // {
          //   headers: {
          //     accept: "*/*",
          //     "Content-Type": "application/json",
          //   },
          // }
        );

        if (user) {
          return user.data;
        } else {
          return null;
        }
      } catch (e) {
        console.log(e.response);
        // return Promise.reject(new Error('error message'))

        throw new Error(e.response.status);
      }

      // if (user) {
      //   console.log(user);
      //   return user;
      // } else {
      //   return null;
      // }
    },
  }),
];

interface MyJwtPaylod extends JwtPayload {
  rules: any;
}
const callbacks = {
  // Getting the JWT token from API response
  async jwt(token: any, user: any) {
    if (user) {
      const userToken = jwt.decode(user.token) as MyJwtPaylod;
      token.rules = unpackRules(userToken.rules);
      // console.log(token.rules);
      token.access_token = user.token;
      token.refresh_token = user.refresh_token;
      token.id = user.id;
    }
    return token;
  },
  async session(session: any, token: any) {
    session.rules = token.rules;
    session.access_token = token.access_token;
    session.refresh_token = token.refresh_token;
    session.user.id = token.id;
    // session.rules = token.rules;
    // console.log(session.rules);
    return session;
  },

  async redirect(url, baseUrl) {
    // console.log(url, baseUrl);
    return url.startsWith(baseUrl) ? url : baseUrl;
  },
};

const options: NextAuthOptions = {
  providers,
  callbacks,
  debug: true,
  useSecureCookies: false,
  events: {
    async error(message) {
      // console.log(message);
      /* error in authentication flow */
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options);
