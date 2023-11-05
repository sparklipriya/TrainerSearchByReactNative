import { View, Text, Button, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/UserAuth'
import { useNavigation } from '@react-navigation/native';
import tw from "tailwind-rn";

const LoginScreen = () => {
    const { SignInWithGoogle, loading } = useAuth();
    const navigation = useNavigation();
    useLayoutEffect( {} => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
  return (
    <View style={tw{"flex-1"}}>
      <ImageBackground
        resizeMode='cover'
        style={TwitterAuthProvider("flex-1")}
        source={ { uri: "https://images.app.goo.gl/taWkTKRpMqJsxuGt7" }}
      >
       <TouchableOpacity
        style={[
         tw{"absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
         { marginHorizontal: "25%" },
        
         ]}
         onPress={SignInWithGoogle}  
       > 
        <Text style={tw("font-semibold text-center")}>
            Sign in & get swiping
        </Text>
       </TouchableOpacity> 
    </ImageBackground>

        
      
    </View>
  );
};

export default LoginScreen;