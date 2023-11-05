import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation,useRoute } from '@react-navigation/native'
import tw from 'react-tw'

const MatchedScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();
    const { loggedInProfile, userSwiped } = params;  
  return (
    <View style={[tw("h-full bg-red-500 pt-20"), { opacity: 0.89}]}>
        <View style={tw("justify-centre px-10 pt-20")}>
            <Image 
            style={tw("h-32 w-full")}
            source={{ uri: "https://images.app.goo.gl/7EstHEfXMwFutHgG8"}} />
        </View>

      <Text style={tw("text-white text-center mt-5")}>
        You and {userSwiped.displayName} have been jim togethe.</Text>
    

    <View style={tw("flex-row justify-evenly mt-5")}>
        <Image style={tw("h-32 w-32 ronded-full")} src={{ uri: loggedInProfile.photoUrl, }}/>
        <Image style={tw("h-32 w-32 ronded-full")} src={{ uri: userSwiped.photoUrl, }}/>
    </View>
    <TouchableOpacity
    style={tw("bg-white m-5 px-10 py-8 rounded-full mt-20")}
    onPress={() => {
        navigation.goBack();
        navigation.navigate("Chat");
    }}><Text style={tw("text-centre")}>Send a message</Text></TouchableOpacity>
    </View>
  )
}

export default MatchedScreen