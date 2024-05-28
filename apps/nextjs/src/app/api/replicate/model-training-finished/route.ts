import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "@ai-song-generator/api";
import Replicate from "replicate";
import { env } from "~/env";

// export const runtime = "edge";

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
}

export function OPTIONS() {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
}

const replicate = new Replicate({
  auth: env.REPLICATE_API_TOKEN,
});

const customVoiceWebhookHandler = async (req: NextRequest) => {
 const json = await req.json();

 console.log("we got the finish model and now we can save this our database so users can generate songs from this custom voice model",json);

 //some db operations



  return Response.json({hello: "world"});

};

export { customVoiceWebhookHandler as POST };