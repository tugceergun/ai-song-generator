import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx: { user } }) => {

    console.log(
      user, 
      "calling the api for the first time from the mobile app");
    return { user };
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @ai-song-generator/auth package
    return "you can see this secret message!";
  }),
});
