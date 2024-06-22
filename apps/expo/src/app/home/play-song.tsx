import React, { useEffect, useState } from 'react'

import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesome} from'@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Button } from '~/components/ui/button';
import { Audio } from 'expo-av';

const _sound = new Audio.Sound();

export const PlaySong = () => {

    const insets = useSafeAreaInsets()

    const params = useLocalSearchParams();

    const playSound= async () => {
       if(!params.url || typeof params.url !== 'string') {
        return Alert.alert('Error', 'Invalid song url we cant find this song');
       }


       try{ 
        !_sound._loaded &&
        (await _sound.loadAsync({
            uri: params.url,
        }));

        await _sound.playAsync();
    }catch(error) {
        console.log(error);
    }
        
      }

      const pauseSound = async () => {
        await _sound?.pauseAsync();
      }

      const downloadSong = async () => {

      }

  return (
    <SafeAreaView>
    <TouchableOpacity onPress={() => {
      router.back();
    }}
    style={{
      top: insets.top,
    }}
     className='absolute right-4 z-10'>
      <FontAwesome name="times" size={24} color="black" />
    </TouchableOpacity>

    <View className="my-auto flex h-full justify-start p-4 gap-4">
      <View className='my-4 flex items-center'>
        <Image source={{ 
          uri:"https://images.unsplash.com/photo-1471029093449-ca61fffdc2af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",}}
          className='rounded-xl shadow bg-black h-64 w-64'
          />
      </View>
      <Text className='text-2xl font-semibold text-gray-900'>
        Play generated song</Text>
        <Text className='text-sm font-semibold text-gray-900'>
        Generate song from youtube video - </Text>
      <View className='gap-4'>
        <View className='flex flex-row gap-4 justify-center'>
            <Button buttonText='Play' 
            onPressHandler={playSound} className='w-[50%]'/>
            <Button buttonText='Pause' 
            onPressHandler={pauseSound} className='w-[50%]' />
            
        </View>
        <View>
        <Button buttonText='Download Song' onPressHandler={downloadSong} 
            />
        </View>
      
        
        </View>
     </View>
    </SafeAreaView>
  )
}

export default PlaySong
