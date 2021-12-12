import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const whitelist = new Set(["mattgperry", "mircostraessle"]);

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_APP_ID,
      clientSecret: process.env.GITHUB_APP_SECRET,
      scope: "read:user",
      async profile(profile) {
        return {
          login: profile.login,
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        } as any;
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const canSignIn =
        whitelist.has(profile.login as string) ||
        (await isSponsor(profile.login as string));

      if (canSignIn) {
        return true;
      } else {
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
  // database: process.env.DATABASE_URL,
});

async function isSponsor(id: string): Promise<boolean> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.GITHUB_USER_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query { 
          user(login: "mattgperry") { 
            isSponsoredBy(accountLogin: "${id}") 
          } 
        }
      `,
    }),
  }).then((res) => res.json());
  console.log(res?.data?.user?.isSponsoredBy);
  return res?.data?.user?.isSponsoredBy || false;
}
