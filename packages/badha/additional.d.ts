declare global {
  interface User {
    id: number;
  }

  module "next-auth" {
    interface Session {
      user: User;
      rules: any;
      access_token: any;
    }
  }
}
