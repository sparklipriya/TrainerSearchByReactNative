import homescreen from './screen/homescreen';
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screen/LoginScreen';
import ModalScreen from './screen/ModalScreen';
import useAuth from './hooks/UserAuth';
const Stack = createNativeStackNavigator();

const stacknavigator = () => {
    const { user } = useAuth();
  return (
  
      <Stack.Navigator
        ScreenOptions={{
            headerShown: false,
        }}
      >
         {user ? (
            <>
            <Stack.Group>
             <Stack.Screen name="Home" component={homescreen} />
             <Stack.Screen name="Chat" component={ChatScreen} />
             <Stack.Screen name="Messages" component={MessageScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal"}}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "transparentmodal"}}>
                <Stack.Screen name="Match" component={MatchedScreen} />
            </Stack.Group>
             
            </>
         ) : (
            <Stack.Screen
             name="Login"
             component={LoginScreen} 
             options={{ headerShown: false}}
             />

            

         )}
        
        
      </Stack.Navigator>
   
  );
};

export default stacknavigator