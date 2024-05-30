import { router, Stack } from 'expo-router';
import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList} from '@shopify/flash-list'
import { Button } from '~/components/ui/button';
import { api } from '~/utils/api';

const MainScreen = () => {

  const testApi  = api.auth.getSession.useQuery();

  return (
   <>
   <Stack.Screen options={{
    headerShown: false,
   }}/>

<SafeAreaView>
    <ScrollView className='mb-8 p-4'>
        <View className='flex flex-wrap w-full flex-row justify-center gap-4'>
          {Array.from({ length:6 })
            .map((_, i) => i)
            .map((item) =>(
              <TouchableOpacity 
              key={item} 
              onPress={() => {
                router.push({
                  pathname: '/home/generate-song',
                  params: {id: item +1},
                })
              }}
              className='flex min-h-[170px] min-w-[170px] items-center
              justify-center rounded-3xl bg-[#393E46]'> 
                <Text className='text-white'>
                  celebrity voice no. { item+1 } {testApi.data?.user?.email}{""}
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
                <TouchableOpacity className='mt-4 h-16 w-full items-center justify-center 
                rounded-lg bg-emerald-400'>
                <Text>generated song {item+1}</Text>
              </TouchableOpacity>
              )
            }}
            estimatedItemSize={12}
            data={Array.from({ length:6 }).map((_, i) => i)}
  
        />

        </View>
        </ScrollView>
        <View className='h-[20%] px-4'>

            <Button

            buttonText='Generate custom song'
            onPressHandler={() => {
              router.push('/home/create-custom-voice')
            }}
       
           />
         
            

        </View>
    
</SafeAreaView>

   </>
  )
}

export default MainScreen;