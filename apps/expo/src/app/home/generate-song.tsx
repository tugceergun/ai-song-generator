
import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesome} from'@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Button } from '~/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  youtubeUrl: z.string().url({
    message: "must be a valid youtube url.",
  }),

})


function GenerateSong() {

  const insets = useSafeAreaInsets()
  const params = useLocalSearchParams();

  console.log(params);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    
  })

  //todo: handle generate song
  const handleGenerateSong = (values: z.infer<typeof formSchema>) => {
       
    console.log(values);

  }

  return (
    <>
  <SafeAreaView>
    <TouchableOpacity onPress={() => {
      router.back()
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
        Put a youtube url of the song you wanna generate</Text>
      <View className='gap-4'>
      <Controller
        control={form.control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
          placeholder="https://www.youtube.com/"
          className='rounded border border-gray-400/50 bg-white-200 p-4'
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="youtubeUrl"
        rules={{ required: true }}
      />

    {form.formState.errors.youtubeUrl && (
        <Text className='text-red-500 font-light text-sm'>{form.formState.errors.youtubeUrl?.message}</Text>
        )}

        <Button buttonText="generate song" onPressHandler={() => {
            console.log("Generating song from video url", params.id)
            form.handleSubmit(handleGenerateSong)()
            router.push("/home/play-song")
        }}/>
        
        </View>
     </View>
    </SafeAreaView>
    </>
  )
}

export default GenerateSong