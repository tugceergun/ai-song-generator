import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Auth } from '~/components/auth'

const Register = () => {
  return (
    <>
  <Stack.Screen options= {{
      title: "Register",
      headerShown:true,
  }}
  />

    <View>
      <Text className='text-center my-4 text-2xl font-bold text-emerald-600 mx-auto'>Register for a new account</Text>
      <Auth formType='register'/>
    </View>
    </>
  )
}

export default Register
