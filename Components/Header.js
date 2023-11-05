import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'react-tw'
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, calEnabled }) => {
    const navigation = useNavigation();
  return (
    <View style={tw("p-2 flex-row items-centre justify-between")}>
        <View style={tw("flex flex-row items-centre")}>
            <TouchableOpacity onPress={() => NavigationPreloadManager.goBack()} style={tw("p-2")}>
                <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
            </TouchableOpacity>
            <Text style={tw("text-2xl font-bold pl-2")}>{title}</Text>    
        </View>
        {calEnabled && (
            <TouchableOpacity style={tw("rounded-full mr-4 p-3 bg-red-200")}>
            <Foundation style={tw("")} name="telephone" size={20} color="red" />
        </TouchableOpacity>

        )}
      
    </View>
  )
}

export default Header