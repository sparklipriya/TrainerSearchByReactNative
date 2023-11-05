import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-rn'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from "../firebase";
import useAuth from '../hooks/UserAuth';
import ChatRow from '../Components/ChatRow';
const ChatList = () => {
    const [matches, setMatches] = useState([]);
    const { user } = userAuth();
    useEffect(() => onSnapshot(query(collection(db, 'matches'),where('usersMatches', 'array-contains', user.uid)),(snapshot) => setMatches(
        snapshot.docs.map((doc) => ({...doc.data(), id: doc.id }))
    )),[user]);
  return matches.length > 0 ? (
    <FlatList style={tw("h-full")}
    data={matches}
    keyExtractor={(item) => item.id}

    renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
    ) : (
        <View style={tw("p-5")}>
            
                <Text style={tw("text-centre text-lg")}>No matches now</Text>
            </View>
    
  )
}

export default ChatList