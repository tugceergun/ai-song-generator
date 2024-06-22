import { authRouter } from "./router/auth";
import { replicateRouter } from "./router/replicate";
import { createTRPCRouter } from "./trpc";
import { voiceRouter } from "./router/voice";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  replicate: replicateRouter,
  voice: voiceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
