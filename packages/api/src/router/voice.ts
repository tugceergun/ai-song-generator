import {desc, eq, generatedSongs, isNotNull, voices} from "@ai-song-generator/db";
import {createTRPCRouter, protectedProcedure} from "../trpc";
import {z} from "zod";
import { TRPCError } from "@trpc/server";
import Replicate from "replicate";
import slugify from "slugify";
import ytdl from "ytdl-core";



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
                .where(eq(generatedSongs.userId, user.id))
                .orderBy(desc(generatedSongs.createdAt))
    
                return {allGeneratedSongs}
            },),



            generateAISong: protectedProcedure.input(z.object({
                youtubeUrl: z.string().url(),
                voiceId: z.string().uuid(),
            })).mutation(
                async ({ctx:{db,user}, input:{youtubeUrl,voiceId}}) => {

                    const [newSong] = await db.insert(generatedSongs).values({
                        userId: user.id,
                        voiceId,
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
                                protect: 0.5,
                                rvc_model: "CUSTOM",
                                index_rate: 1,
                                // todo it will change bu değişecek uygulamadan alcaz song inputu
                                song_input: "https://replicate.delivery/pbxt/JvgakOpSJzQRSNYymHq2gKmQws48cye3DlCSL55qxu9f5YQt/taylor-trim.mp3",
                                reverb_size: 0.6,
                                pitch_change: "female-to-male",
                                rms_mix_rate: 0.8,
                                filter_radius: 3,
                                output_format: "mp3",
                                reverb_damping: 0.7,
                                reverb_dryness: 0.8,
                                reverb_wetness: 0.3,
                                crepe_hop_length: 8,
                                pitch_change_all: 0,
                                main_vocals_volume_change: 3,
                                pitch_detection_algorithm: "mangio-crepe",
                                instrumental_volume_change: 0,
                                backup_vocals_volume_change: -10,
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

});