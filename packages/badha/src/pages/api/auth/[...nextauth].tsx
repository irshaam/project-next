import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const providers = [
  Providers.Credentials({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
    },

    async authorize(credentials): Promise<any> {
      try {
        const user = await axios.post(
          "http://localhost:8000/auth/login",
          credentials,
          // {
          //   user: {
          //     password: credentials.password,
          //     email: credentials.email,
          //   },
          // },
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );

        if (user) {
          // console.log(user.data);
          return user.data;
        } else {
          return null;
        }
      } catch (e) {
        throw new Error("There was an error on user authentication");
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

const callbacks = {
  // Getting the JWT token from API response
  async jwt(token: any, user: any) {
    if (user) {
      token.access_token = user.token;
      token.refresh_token = user.refresh_token;
    }
    return token;
  },
  async session(session: any, token: any) {
    session.access_token = token.access_token;
    session.refresh_token = token.refresh_token;
    return session;
  },
};

const options = {
  providers,
  callbacks,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options);
