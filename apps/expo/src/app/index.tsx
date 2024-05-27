import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '@supabase/auth-helpers-react'

const Index = () => {

  const router =useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.push("/home/main");
    }
  }, [user]);


  return (
    <SafeAreaView>
      <LottieView
        autoPlay
        style={{
          width: "100%",
          height: "70%",
        }}
       
        source={require('../../assets/lottie/onboarding.json')}
      />
      <Text className='text-center text-2xl text-emerald-600 font-semibold'>Welcome to the AI Song Generator</Text>
      <View className='my-2 flex w-full items-center mx-auto mt-auto  max-w-[80%] gap-4 p-4'>
      <TouchableOpacity onPress={() => {
        router.push('/(auth)/register');
      
      }}
       className=' flex w-full items-center justify-center rounded-xl bg-black p-4'>
        <Text className='text-emerald-100'>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        router.push('/(auth)/login');
      }}
       className=' flex w-full items-center justify-center rounded-xl border border-black bg-white p-4'>
        <Text className='text-black'>SIGN IN</Text>
      </TouchableOpacity>
      </View>
     
    </SafeAreaView>
  )
}

export default Index
