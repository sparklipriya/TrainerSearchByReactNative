import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-rn'

const ReceiverMessage = () => {
  return (
    <View style={[tw("bg-red-400 rounded-lg rounded-tl-none px-5 py-3 nx-3 ny-2 ml=14"),{ alignSelf: "flex-start" },

    ]}>
        <Image style={tw("h-12 w-12 rounded-full absolute top-0 -left-14")}
        source={{ uri: message.photURK }} />
      <Text style={tw("text-white")}>{message.message}</Text>
    </View>
  )
}

export default ReceiverMessage