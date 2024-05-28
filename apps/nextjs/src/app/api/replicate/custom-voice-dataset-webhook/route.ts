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

 console.log(json);

 //we got the data

 if(!json?.output){
  return Response.json({"message":"output zip file not found"});
 }

 const output = await replicate.run(
  "replicate/train-rvc-model:0397d5e28c9b54665e1e5d29d5cf4f722a7b89ec20e9dbf31487235305b1a101",
  {
    input: {
      epoch: 80,
      version: "v2",
      f0method: "rmvpe_gpu",
      batch_size: "7",
      //our custom dataset we were cereated now
      dataset_zip: json.output,
      sample_rate: "48k"
    },

    webhook: 
     "https://7803-5-47-237-35.ngrok-free.app/api/replicate/custom-voice-dataset-webhook",
      webhook_events_filter: ["completed"],
  }
);
console.log(output);

  return Response.json({hello: "world"});

};

export { customVoiceWebhookHandler as POST };