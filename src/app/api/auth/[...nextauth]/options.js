import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your-awesome-username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://127.0.0.1:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await res.json();
        let role;
        if (user.permissions.includes("Student")) {
          role = "Student";
        }
        if (user.permissions.includes("Wykladowca")) {
          role = "Wykladowca";
        }
        if (user.permissions.includes("Administrator")) {
          role = "Administrator";
        }
        if (res.ok && user) {
          // console.log(user);
          return {
            id: user.user.id,
            name: user.user.first_name + " " + user.user.last_name,
            role: role,
            token: user.token,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.token = user.token;
      }
      // console.log(token);
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      session.user.token = token.token;
      // console.log(session);
      return session;
    },
  },
};

// async signIn({ user, account, profile, email, credentials }) {
//   console.log("User Signin Start: ", user);
//   // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).{
//   if (user) {
//     console.log(user);
//     // const sessionMaxAge = 60 * 60 * 2; //2 hours
//     // const sessionExpiry = fromDate(sessionMaxAge); // Implement a function to calculate the session cookie expiry date
//     // console.log(sessionExpiry);
//     // await adapter.createSession({
//     //   sessionToken: user.token,
//     //   userId: user.user.id,
//     //   expires: sessionExpiry,
//     // });
//     cookies().set("user.first_name", user.user.username);
//     cookies().set("user.last_name", user.user.username);
//     cookies().set("user.username", user.user.username);
//     cookies().set("user.id", user.user.id);
//     cookies().set("user.token", user.token);
//     cookies().set("user.permissions", user.permissions);
//     console.log("user Session: ", user.user.username);
//   }
//   if (user.success) return true;
//   else return false;
// },
