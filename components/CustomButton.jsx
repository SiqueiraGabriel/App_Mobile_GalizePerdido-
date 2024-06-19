import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export const CustomButton = ({title, handlePress, isLoading, styledComponent}) => {
  return (
    <TouchableOpacity 
        className={`bg-secondary min-h[48px] justify-center items-center p-5  w-100 rounded-xl ${styledComponent}`}
        onPress={handlePress}
        disabled={isLoading}
        activeOpacity={0.7}
    >
        <Text className="text-lg pl-20 pr-20">{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton