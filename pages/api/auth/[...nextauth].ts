import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { imageOptimizer } from "next/dist/server/image-optimizer";
const postUser = async (email: string, name: string, profile_picture: string) => {
  type Customer = {
    email: String;
    name: String;
    profile_picture: String;
  };
  try {
    const newCustomer: Customer = {
      email: email,
      name: name,
      profile_picture: profile_picture,
    };
    fetch("http://localhost:3000/api/auth/addCustomer", {
      body: JSON.stringify(newCustomer),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  } catch (e) {
    console.log(e);
  }
};
const checkUserExisted = async () => {};
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        let result = await fetch(`http://localhost:3000/api/auth/validateUser/?email=${profile.email}`);
        let jsonResult = await result.json();
        let count = jsonResult["count"];
        if (count === 0) {
          postUser(profile.email!, profile.name!, user.image!);
        }
      } catch (e) {
        console.log(e);
      }
      return true;
    },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },
});
