import { Button, FlatList, Keyboard, Platform, View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header } from 'react-native/Libraries/NewAppScreen'
import { SafeAreaView } from 'react-native-safe-area-context';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import useAuth from '../hooks/UserAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import tw from 'tailwind-rn';
import SenderMessage from '../Components/SenderMessage';
import ReceiverMessage from '../Components/ReceiverMessage';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../firebase'
import { serverTimestamp } from 'firebase/firestore';

import { useRoute } from '@react-navigation/native';
const MessageScreen = () => {
    const user = useAuth();
    const { params } = userRoute();
    const {input, setInput} = useState("");
    const [messages, setMessages] = useState([])
    const { matchDetails } = params;

    useEffect(() => 
        onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy ('timestamp','desc')), snapshot => setMessages(snapshot.docs.map(doc => ({
            id: doc.id,
          ...doc.data()
        }))
        ));
    , [matchDetails, db])
    const sendMessage = () => {
        addDoc(collection(db, "matches", matchDetails.id, "messages"), {
            timestamp: serverTimestamp(),
            
            userId: user.uid,
            displayName: user.displayName,
            photoURL: matchDetails.users[user.uid].photoURL,
            message: input,
        })
        setInput("");
    };
    
  return (
    <SafeAreaView style={tw("flex-1")}>
        <Header title={getMatchedUserInfo(matchDetails.users, user.uid).displayName} callEnabled />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw("flex-1")}
      keyboardVerticalOffset={10}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList data={messages}
            inverted={-1}
            style={tw("pl-4")}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
            message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
            ) : (
                <ReceiverMessage key={message.id} message={message} />
            )
            }
            />

        </TouchableWithoutFeedback>
        <View style={tw("flex-row justify-between items-center border-t border-gray-200 px-5 py-2")}>
        <TextInput style = {tw("h-10 text-lg")} placeholder='Send a message'
        onChangeText={setInput}
        onSubmitEditing={sendMessage}
        value={input}/>
      </View>

      </KeyboardAvoidingView>
      
    </SafeAreaView>
  )
}

export default MessageScreen