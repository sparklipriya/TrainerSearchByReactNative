import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import tw from 'react-tw';
import useAuth from '../hooks/UserAuth';
import { serverTimestamp, setDoc } from 'firebase/firestore';



const ModalScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);
    const incompleteForm = !image || !job || !age;
    const updateUserProfile = () => {
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL: image,
            
            job: job,
            age: age,
            timestamp: serverTimestamp()
        })
        .then(() => {
            navigation.navigate("Home");
        })
        .catch((error) => {
            alert(error.message);
        });    
    };

    return (
        <View style={tw("flex-1 items-center pt-1")}>
            <Image
             style={tw("h-20 w-full")}
             resizeMode='contain'
             source={{uri: "https://images.app.goo.gl/KmzjuMqc7732C6ceA" }}>
            />
            <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
                Welcome {user.displayName}
            </Text>
            <Text style={tw("text-centre p-4 font-bold text-red-400")}>
                Step 1: Profile Pic
            </Text>
            <TextInput
            value={image}
            onChangeText={text => setImage(text)}
            style={tw("text-centre text-xl pb-2")}
            placeholder='Enter profile picture'/>

            <Text style={tw("text-centre p-4 font-bold text-red-400")}>
                Step 2: Job
            </Text>
            <TextInput
            value={job}
            onChangeText={text => setJob(text)}
            style={tw("text-centre text-xl pb-2")}
            placeholder='Enter occupation'/>

            <Text style={tw("text-centre p-4 font-bold text-red-400")}>
                Step 3: Age
            </Text>
            <TextInput
            value={age}
            onChangeText={text => setAge(text)}
            style={tw("text-centre text-xl pb-2")}
            placeholder='Enter age'
            keyboardType='numeric'
            maxLength={2}/>

            <TouchableOpacity 
            disabled={incompleteForm}
            style={[
                tw("w-64 p-3 rounded-xl absolute bottom=10"), 
                incompleteForm ? tw('bg-gray-400') : tw("bg-red-400"),
            ]}
            onPress={updateUserProfile}>
                <Text style={tw("text-center text-white text-xl")}>UpdateProfile</Text>
            </TouchableOpacity>
        </View>
    );
    
  
};

export default ModalScreen