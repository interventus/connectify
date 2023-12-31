import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { GoogleStrategy } from "remix-auth-google";

type User = {
  id: string;
  name: string;
  email: string;
  picture?: "string";
};

export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email") as string;
    let password = form.get("password") as string;
    let user = { id: "233", email, name: "wow" };
    return user;
  }),
  "user-pass"
);

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async ({ profile }) => {
    const user = {
      name: profile._json.name,
      email: profile._json.email,
      picture: profile._json.picture,
    };
    console.log(user);
    return { id: "233", email: "wow", name: "wow" };
  }
);

authenticator.use(googleStrategy);
