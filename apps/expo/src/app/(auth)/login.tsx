import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Auth } from '~/components/auth'

const Login = () => {
  return (
    
    <>
    <Stack.Screen options={{
      title: "Login",
}} 
/>

    <SafeAreaView>
      <Text className='text-center text-2xl my-4 font-bold text-emerald-600 mx-auto'>Login with existing account</Text>
      <Auth formType='login'/>
    </SafeAreaView>
    </>
  )
}

export default Login
