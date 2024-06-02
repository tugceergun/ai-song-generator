import { router, Stack } from 'expo-router';
import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList} from '@shopify/flash-list'
import { Button } from '~/components/ui/button';
import { api } from '~/utils/api';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const MainScreen = () => {

const supabase = useSupabaseClient();
const getAllVoices = api.voice.getAllVoices.useQuery();
const getAllGeneratedSongs = api.voice.getAllGeneratedSongs.useQuery();

  return (
   <>
   <Stack.Screen options={{
    headerShown: false,
   }}/>

<SafeAreaView>
    <ScrollView className='mb-8 p-4'>
        <View className='flex flex-wrap w-full flex-row justify-center gap-4'>
          {getAllVoices.isSuccess && getAllVoices.data.allVoices
            .map((voice) =>( // bunlar sıkıntı hatalar değil çalışıyor uygulama 
              <TouchableOpacity 
              key={voice.id} 
              onPress={() => {
                router.push({
                  pathname: '/home/generate-song',
                  params: { voiceId: voice.id },
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
                    pathname: '/home/generate-song',
                    params: item.audioUrl ? {url: item.audioUrl} : undefined
                  })
                }} className='mt-4 h-16 w-full items-center justify-center
                rounded-lg bg-emerald-400'>
                <Text>{item.title}</Text>
              </TouchableOpacity>
              )
            }}
            estimatedItemSize={10}
            data={getAllGeneratedSongs.data?.allGeneratedSongs ?? [] }
  
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
                      buttonText="Sign out"
                      onPressHandler={async () => {
                        await supabase.auth.signOut();
                        router.push("/");
                      }}
            />
         
            

        </View>
    
</SafeAreaView>

   </>
  )
}

export default MainScreen;