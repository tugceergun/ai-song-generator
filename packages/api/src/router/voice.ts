<<<<<<< HEAD

import { desc, eq, generatedSongs, isNotNull, voices, and } from '@ai-song-generator/db';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { TRPCError } from "@trpc/server";
import Replicate from "replicate";
import slugify from "slugify";
import ytdl from "ytdl-core";
import { z } from "zod";



const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

export const voiceRouter = createTRPCRouter({

    getAllVoices: protectedProcedure.query(
        async ({ctx:{db}}) => {
            const allVoices = await db.select({
                id:voices.id,
                name:voices.name,
                thumbnailUrl:voices.thumbnailUrl,
            }).from(voices).where(isNotNull(voices.modelUrl))

            return {allVoices}
        }
    ),

    getAllGeneratedSongs: protectedProcedure.query(
        async ({ctx:{db, user}}) => {
            const allGeneratedSongs = await db.select().from(generatedSongs).where(and(eq(generatedSongs.userId, user.id), isNotNull(generatedSongs.audioUrl))).orderBy(desc(generatedSongs.createdAt))

            return {allGeneratedSongs}
        },
    ),


    generateAISong: protectedProcedure.input(z.object({
        youtubeUrl: z.string().url(),
        voiceId: z.string().uuid(),
    })).mutation(
        async ({ctx:{db,user}, input:{youtubeUrl, voiceId}}) => {

            const info = await ytdl.getBasicInfo(youtubeUrl);

            const [newSong] = await db.insert(generatedSongs).values({
                userId: user.id,
                voiceId,
                title: info.videoDetails.title,
            }).returning()


            const [getCustomTrainedModelUrl] = await db.select().from(voices).where(eq(voices.id, voiceId)).limit(1);


            if(!getCustomTrainedModelUrl?.modelUrl) {
                throw new TRPCError({
                    code: "BAD_REQUEST", message: "custom voice does not exist!"
                });
            }


            try {
                
                await replicate.predictions.create({
                  version:
                    "0a9c7c558af4c0f20667c1bd1260ce32a2879944a0b9e44e1398660c077b1550",
                    input:{
                        protect: 0.33,
                        rvc_model: "CUSTOM",
                        index_rate: 0.5,
                        song_input: "https://replicate.delivery/pbxt/JsPIizFfRy54Jk5LuXdnrNdV1JHJ6oLmPPdRuIfh3lvpoNai/gangnam.mp3",
                        reverb_size: 0.15,
                        pitch_change: "no-change",
                        rms_mix_rate: 0.25,
                        filter_radius: 3,
                        output_format: "mp3",
                        reverb_damping: 0.7,
                        reverb_dryness: 0.8,
                        reverb_wetness: 0.2,
                        crepe_hop_length: 128,
                        pitch_change_all: 0,
                        main_vocals_volume_change: 10,
                        pitch_detection_algorithm: "rmvpe",
                        instrumental_volume_change: 0,
                        backup_vocals_volume_change: 0,
                        custom_rvc_model_download_url: getCustomTrainedModelUrl?.modelUrl
                      },
                  webhook: `${process.env.REPLICATE_WEBHOOK_URL}/api/replicate/song-generation-completed?songId=${newSong?.id}`,
                  webhook_events_filter: ["completed"],
                });
              } catch (error) {
                console.log(error);
      
                throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message: "something went wrong with replicate!",
                });
              }

        },
    ),
=======
import { TRPCError } from "@trpc/server";
import axios from "axios";
import Replicate from "replicate";
import ytdl from "ytdl-core";
import { z } from "zod";

import {
  and,
  desc,
  eq,
  generatedSongs,
  isNotNull,
  voices,
} from "@ai-song-generator/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});


export const voiceRouter = createTRPCRouter({
  getAllVoices: protectedProcedure.query(
      async ({ctx:{db}}) => {
          const allVoices = await db.select({
              id: voices.id,
              name: voices.name,
              thumbnailUrl: voices.thumbnailUrl,
          }).from(voices).where(isNotNull(voices.modelUrl))

          return {allVoices}
      }),
      getAllGeneratedSongs: protectedProcedure.query(
          async ({ctx:{db,user}}) => {
              const allGeneratedSongs = await db.select()
              .from(generatedSongs)
              .where(and(eq(generatedSongs.userId, user.id),isNotNull(generatedSongs.audioUrl)))
              .orderBy(desc(generatedSongs.createdAt))

              return {allGeneratedSongs}
          },),



          generateAISong: protectedProcedure.input(z.object({ 
              youtubeUrl: z.string().url(),
              voiceId: z.string().uuid(),
          })).mutation(
              async ({ctx:{db,user}, input:{youtubeUrl,voiceId}}) => {

                const info = await ytdl.getBasicInfo(youtubeUrl);

                  const [newSong] = await db.insert(generatedSongs).values({
                      userId: user.id,
                      voiceId,
                      title: info.videoDetails.title,
                  }).returning()


                  const [getCustomTrainedModelUrl] = await db.select().from(voices).where(eq(voices.id, voiceId)).limit(1)

                  if(!getCustomTrainedModelUrl){
                      throw new TRPCError({
                          code: "NOT_FOUND",
                          message: "voice not found!",
                      })
                  }


                  try {

                      await replicate.predictions.create({
                        version:
                        "c445e27ff34574e92781c15c67db41835cedcdc27a19f527a7dcf37bd0ffe1ff",
          input: {
            protect: 0.33,
            rvc_model: "CUSTOM",
            index_rate: 0.5,
            song_input: "https://replicate.delivery/pbxt/JsPIizFfRy54Jk5LuXdnrNdV1JHJ6oLmPPdRuIfh3lvpoNai/gangnam.mp3",
            reverb_size: 0.15,
            pitch_change: "no-change",
            rms_mix_rate: 0.25,
            filter_radius: 3,
            output_format: "mp3",
            reverb_damping: 0.7,
            reverb_dryness: 0.8,
            reverb_wetness: 0.2,
            crepe_hop_length: 128,
            pitch_change_all: 0,
            main_vocals_volume_change: 10,
            pitch_detection_algorithm: "rmvpe",
            instrumental_volume_change: 0,
            backup_vocals_volume_change: 0,
            custom_rvc_model_download_url: getCustomTrainedModelUrl?.modelUrl,
          },
                        webhook: `${process.env.REPLICATE_WEBHOOK_URL}/api/replicate/song-generation-completed?songId=${newSong?.id}`,
                        webhook_events_filter: ["completed"],
                      });
                    } catch (error) {
                      console.log(error);

                      throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "something went wrong with replicate!",
                      });
                    }


              }
          )
>>>>>>> 2107f55ffbac77f5c61798cdf210ce347c5fd9de

});