
import React, { createContext, useContext, useEffect, useMemo } from 'react'
import * as Google from 'expo-google-app-auth';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from "@firebase/auth";
import { auth } from '../firebase';

const AuthContext = createContext({});
const config = {
    androidClientId: '1934567890152.apps.googleusercontent.com',
    iosClientId:'AIzaSyAK7c22Zz54jeEDKkp9r2th8wUx6ciR2O0k'
    scope: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUse] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(
        () => 
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoadingInitial(false);
        }),
        []
    );
    const logout = () => {
        setLoading(true);
        signOut(auth)
         .catch((error) => setError(error))
         .finally(() => setLoading(false));
    };
    
    const signInWithGoogle = async() => {
        setLoading(true);
        await Google.logInAsync(config).then(async (logInResult) => {
            if (logInResult.type === 'success') {
                const { idToken, accessToken } =logInResult;
                const credentials = GoogleAuthProvider.credential(idToken, accessToken);
                await signInWithCredential(auth, credential);
            }
            return Promise.reject();
            
        })
        .catch(error => setUserProperties(error))
        .finally(() => setLoading(false));
    };
    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        signInWithGoogle,
        logout,
    }), [user, loading, error])
    return (
        <AuthContext.Provider value={memoedValue}>
            {! loadingInitial && children}
        </AuthContext.Provider>
    );
    
};
export default function useAuth() {
    return useContext(AuthContext);
}
