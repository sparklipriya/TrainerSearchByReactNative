import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/UserAuth';
import { collection, onSnapshot } from 'firebase/firestore';

const ChatRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const[getMatchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState([''])
    useEffect(() => { 
        setMatchedUserInfo(getMatchedUser(matchDetails.users, user.uid));
}, [matchDetails, user]);

useEffect(() => 
onSnapshot(
    query(
        collection(db, 'matches', matchDetails.id, 'messages'),
        orderBy('timestamp', 'desc'),
    ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
),
    [matchDetails, db]

    )


  return (
    <TouchableOpacity
    style={[tw("flex-row items-centre py-3 px-5 bg-white mx-3 my-1 rounded-lg"), styles.cardShadow]}>
        onPress={() =>navigation.navigate("Messages", {matchDetails,})}
        <Image style={tw("rounded-full h-16 w-16 mr-4")}
        source={{ uri: getMatchedUserInfo?.photoURL}}/>
        <View>
             
            <Text style={tw("text-lg font-semigold")}>{getMatchedUserInfo?.displayName}</Text>
            <Text>{lastMessage || 'Say hi!'}</Text>
            </View>
    </TouchableOpacity>
  )
}

export default ChatRow
const style = StyleSheet.create({
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    }
})