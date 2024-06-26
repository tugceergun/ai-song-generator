import { router, Stack } from 'expo-router';
import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList} from '@shopify/flash-list'
import { Button } from '~/components/ui/button';
import { api } from '~/utils/api';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const MainScreen = () => {
<<<<<<< HEAD
  const supabase = useSupabaseClient();
  const getAllVoices = api.voice.getAllVoices.useQuery();
  const getAllGeneratedSongs = api.voice.getAllGeneratedSongs.useQuery();
=======

const supabase = useSupabaseClient();
const getAllVoices = api.voice.getAllVoices.useQuery();
const getAllGeneratedSongs = api.voice.getAllGeneratedSongs.useQuery();
>>>>>>> 2107f55ffbac77f5c61798cdf210ce347c5fd9de

  return (
   <>
   <Stack.Screen options={{
    headerShown: false,
   }}/>

<SafeAreaView>
    <ScrollView className='mb-8 p-4'>
        <View className='flex flex-wrap w-full flex-row justify-center gap-4'>
          {getAllVoices.isSuccess && getAllVoices.data.allVoices
<<<<<<< HEAD
            .map((voice) =>(
=======
            .map((voice) =>( // bunlar sıkıntı hatalar değil çalışıyor uygulama 
>>>>>>> 2107f55ffbac77f5c61798cdf210ce347c5fd9de
              <TouchableOpacity 
              key={voice.id} 
              onPress={() => {
                router.push({
                  pathname: '/home/generate-song',
<<<<<<< HEAD
                  params: {voiceId: voice.id},
=======
                  params: { voiceId: voice.id },
>>>>>>> 2107f55ffbac77f5c61798cdf210ce347c5fd9de
                })
              }}
              className='flex min-h-[170px] min-w-[170px] items-center
              justify-center rounded-3xl bg-[#393E46]'> 
                <Text className='text-white'>
                 {voice.name}
                </Text>
              </TouchableOpacity>
            ))
          }
        
        </View>
        <View className='my-4'>
          <View className='flex flex-row items-center justify-between'>
          <Text className='text-xl font-semibold text-black'>Recently generated songs</Text>
          <Button buttonText='see all' onPressHandler={() => {}} className='w-fit'/>
          </View>
        <FlashList
            renderItem={({ item }) => {
              return(
                <TouchableOpacity onPress={() => {
                  router.push({
<<<<<<< HEAD
                    pathname: '/home/play-song',
                    params: {url: item.audioUrl},
                  })
                }} className='mt-4 h-16 w-full items-center justify-center 
=======
                    pathname: '/home/generate-song',
                    params: item.audioUrl ? {url: item.audioUrl} : undefined
                  })
                }} className='mt-4 h-16 w-full items-center justify-center
>>>>>>> 2107f55ffbac77f5c61798cdf210ce347c5fd9de
                rounded-lg bg-emerald-400'>
                <Text>{item.title}</Text>
              </TouchableOpacity>
              )
            }}
<<<<<<< HEAD
            estimatedItemSize={12}
            data={getAllGeneratedSongs.data?.allGeneratedSongs}
=======
            estimatedItemSize={10}
            data={getAllGeneratedSongs.data?.allGeneratedSongs ?? [] }
>>>>>>> 2107f55ffbac77f5c61798cdf210ce347c5fd9de
  
        />

        </View>
        </ScrollView>
        <View className='h-[20%] px-4 gap-4'>

            <Button

            buttonText='Generate custom song'
            onPressHandler={() => {
              router.push('/home/create-custom-voice')
            }}
       
           />

            <Button
<<<<<<< HEAD

            buttonText='Sign Out'
            onPressHandler={async () => {
              await supabase.auth.signOut();
              router.push('/');
            }}

=======
                      buttonText="Sign out"
                      onPressHandler={async () => {
                        await supabase.auth.signOut();
                        router.push("/");
                      }}
>>>>>>> 2107f55ffbac77f5c61798cdf210ce347c5fd9de
            />
         
            

        </View>
    
</SafeAreaView>

   </>
  )
}

export default MainScreen;