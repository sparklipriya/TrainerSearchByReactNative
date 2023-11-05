import { SafeAreaViewView, Text } from 'react-native'
import React from 'react'
import Header from '../Components/Header'

const ChatScreen = () => {
  return (
    <SafeAreaViewView>
        <Header title="Chat" />
        <ChatList />
    </SafeAreaViewView>
  )
}

export default ChatScreen