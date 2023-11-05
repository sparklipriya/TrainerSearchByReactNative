import { View, Text, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/UserAuth';

import tw from 'tailwind-rn';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { collection, getDocs, onSnapshot, doc, query, setDoc, where, DocumentSnapshot, serverTimestamp } from 'firebase/firestore';
import generateId from '../lib/generateId';
const DUMMY_DATA = [
    {
        firstName: 'Priya',
        lastName: 'Kumar',
        occupation: 'engineering',
        photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        age: 24,
        id: 234,
    },
    {
        
            firstName: 'Saksh',
            lastName: 'Shan',
            occupation: 'cloud engineering',
            photoURL: 'https://images.app.goo.gl/UpgKfCyjETV9C26Y8'
            age: 25,
            id: 235,
        
    },
    {
        
        firstName: 'Piyush',
        lastName: 'Khan',
        occupation: 'mechanic',
        photoURL: 'https://images.app.goo.gl/FbzJaBGCQVGePxPu9'
        age: 19,
        id: 236,
    },
]; 




const homescreen = () => {
    const navigation = usedNavigation();
    const { user, logout } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const swipeRef = useRef(null);

    useLayoutEffect(() => {
        const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
            console.log(snapshot);
            if(!snapshot.exists()) {
                navigation.navigate("Modal");
            }
            });
            return unsub();
        },[]);
    useEffect(() => {
        let unsub;
        const fetchCards = async () => {
            const passes = await getDocs(collection(db, "users", user.uid, "passes")).then((snapshot) => snapshot.doc.map((doc) => doc.id));
            const swipes = await getDocs(collection(db, "users", user.uid, "passes")).then((snapshot) => snapshot.doc.map((doc) => doc.id));
            const passedUserIds = passes.length > 0 ? passes : ['test'];
            const swipedUserIds = swipes.length > 0 ? swipes : ['test'];
           
        
            unsub = onSnapshot(query(collection(db, "users"), where("id", "not-in", [...passedUserIds, ...swipedUserIds])), (snapshot) => {
                setProfiles(
                    snapshot.docs.filter(doc => doc.id !== user.uid).map((doc) => ({
                      ...doc.data(),
                        id: doc.id,
                    }))
                );
            });

        };
        fetchCards();
        return unsub;    
    }, [db])  ;
    const swipeLeft = (cardIndex) => {
        if (!profiles[cardIndex]) return;
        const userSwiped = profiles[cardIndex];
        console.log('You swiped PASS on ${userSwiped.displayName}');
        setDoc(doc(db, "users", user.uid, "passes", userSwiped.id),userSwiped);
    };
    const SwipeRight = async (cardIndex) => {
        if (!profiles[cardIndex]) return;
        const userSwiped = profiles[cardIndex];
        const loggedInProfile = await (await getDoc(db, "users", user.uid)).data();
        getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then((DocumentSnapshot) =>{
            if (documentSnapshot.exists()) {
                console.log("Hooray, matched with ${userSwiped.displayName}");
                setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id),userSwiped); 
                setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)), {
                    users: {
                        [user.uid]: loggedInProfile,
                        [userSwiped.id]: userSwiped
                    },
                    usersMatched: [user.uid, userSwiped.id]
                    timestamp: serverTimestamp(),
                });
                navigation.navigate("Match", {
                    loggedInProfile,userSwiped
                });
        } else {
            console.log('You swiped PASS on ${userSwiped.displayName}');
        setDoc(doc(db, "users", user.uid, "passes", userSwiped.id),userSwiped);

        }
    }
        );
        
    

        
    };
     
       
  return (
    <SafeAreaView style={tw("flex-1")}>
        <View style={tw("flex-row items-centre justify-between px-5")}>
            <TouchableOpacity onPress={logout}>
                <Image

                style={tw("h-10 w-10 rounded-full")}
                source={{ uri: user.photoURL}}
                />

            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
            <Image style={tw("h-14 w-14")} source={require("../logo.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Ionicons name='chatbubbles-sharp' size={30} color="#FF5864"/>
        </TouchableOpacity>

        </View>
        <View style={tw("flex-1 -mt-6")}>
            <Swiper
              ref={swipeRef} 

              containerStyle={{ backgroundColor: "transparent" }}
              cards={DUMMY_DATA}
              stackSize={5}
              cardIndex={0}
              animateCardOpacity
              verticalSwipe={false}
              onSwipedLeft={(cardIndex) => {
                console.log("Swipe PASS");
                swipeLeft(cardIndex);
              }}
              onSwipedRight={(cardIndex) => {
                console.log("Swipe MATCH");
                SwipeRight(cardIndex);
              }}
              backgroundColor={"#4FD0E9"}
              overlayLabels={{
                left: {
                    title: "NOPE",
                    styles: {
                        label: {
                            textAlign: "right",
                            color: "red",
                        },
                    },    
                },
                right: {
                    title: "YES",
                    styles: {
                        label: {
                            
                            color: "green",
                        },
                    },
                },
              }}
              renderCard={(card) => card ? (
                <View
                 key={card.id} 
                 style={tw("bg-white h-3/4 rounded-xl")}
                 >
                    <Image
                    style={tw("absolute top-0 h-full w-full rounded-xl")}
                    source={{uri: card.photoURL}}/>
                    <View
                     style={[
                        tw(
                            "absolute bottom-0 bg-white w-full flex-row justify-between items-centre h-20 px-6 py-2 rounded-b-xl"), styles.cardshadow,]}>
                        <View>
                            <Text style={tw("text-xl font-bold")}>
                                {card.displayName}
                            </Text>
                            <Text>{card.job}</Text>
                        </View>
                        <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                    </View>
                    
                    
                </View>
                    
              ) : (
                <View 
                style={[
                    tw(
                        "relative bg-white h-3/4 rounded-xl justify-centre items-centre"
                        ),
                    styles.cardShadow,
                ]}
                >
                    <Text style={tw("font-bold pb-5")}>No more profiles</Text>
                    <Image
                    style={tw("h-20 w-full")}
                    height={100}
                    width={100}
                    source={{uri: "https://images.app.goo.gl/FtxYpa8hVJi6vUKHA"}}/>
                </View>
              )}
            />  
        </View>
        <View style={tw("flex flex-row justify-evenly")}>
            <TouchableOpacity
            onPress={() => swipeRef.current.swipeLeft()}
              style={tw(
                "items-centre justify-center rounded-full w-16 h-16 bg-red-200"
              )}>
                <Entypo name='cross' size={24} color="red"/>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => swipeRef.current.swipeRight()}
              style={tw(
                "items-centre justify-center rounded-full w-16 h-16 bg-green-200"
              )}>
                <AntDesign name='heart' size={24} color="green"/>
              </TouchableOpacity>
        </View>      
        
      
    </SafeAreaView>
  );
};

export default homescreen;
const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
});