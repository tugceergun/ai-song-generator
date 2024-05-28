import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { cn } from '~/utils/cn';


interface ButtonProps {
  buttonText: string;
  onPressHandler: () => void;
  className?: string;
  isLoading?: boolean;
}

export const Button = ({
  buttonText,
  onPressHandler, 
  className,
  isLoading,
}: ButtonProps) => {
  return (
    <TouchableOpacity 
        disabled={isLoading}
        onPress={onPressHandler}
       className={cn(
        //'flex w-full items-center justify-center rounded-lg bg-white p-4',
        className,
        )}
        >
        <Text className='text-black'>{isLoading ? "Loading..." : buttonText}</Text>
      </TouchableOpacity>
  )
}

