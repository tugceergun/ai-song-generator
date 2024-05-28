import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import Replicate from "replicate"
import { TRPCError } from "@trpc/server";



const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

//dataset
export const replicateRouter = createTRPCRouter({
    createCustomVoice: protectedProcedure.input(z.object({
        youtubeUrl: z.string().url(),
        voiceName: z.string().min(2),
    })).mutation(
        async({ctx:{db,user},input:{voiceName,youtubeUrl}}) => {
            try {
                const output = await replicate.run(
                    "zsxkib/create-rvc-dataset:c445e27ff34574e92781c15c67db41835cedcdc27a19f527a7dcf37bd0ffe1ff",
                    {
                      input: {
                        audio_name: voiceName,
                        youtube_url: youtubeUrl,
                      },
                      webhook: 
                      "https://7803-5-47-237-35.ngrok-free.app/api/replicate/custom-voice-dataset-webhook",
                      webhook_events_filter: ["completed"],
                    }
                  );
                  console.log(output);
            } catch (error) {
                throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Failed to create custom voice"})
            }
        }
    ),


})