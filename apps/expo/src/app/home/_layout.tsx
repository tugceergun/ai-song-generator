import { Stack } from 'expo-router'
import React from 'react'

function HomeLayout() {
  return (
    <Stack

      screenOptions={{
        headerShown: false,
      }}
      >

      <Stack.Screen name="main"/>

      <Stack.Screen name="home/generate-song"/>

      </Stack>
  )
}

export default HomeLayout