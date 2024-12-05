import { Button, View } from 'react-native';
import { app } from '../../utils/firebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore"
import { Input } from '~/components/ui/input';
import React from 'react';


export default function Profile() {
    const auth = getAuth(app);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onChangeText = (text: string) => {
        setEmail(text);
    };
    const onChangePassword = (text: string) => {
        setPassword(text);
    }

    return (
        <View>
            <Input
                placeholder='Enter your email'
                value={email}
                onChangeText={onChangeText}
                aria-labelledby='inputLabel'
                aria-errormessage='inputError'
            />
            <Input
                placeholder='Enter your password'
                value={password}
                onChangeText={onChangePassword}
                aria-labelledby='inputLabel'
                aria-errormessage='inputError'
            />
            <Button title='Sign Up' onPress={() => createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                })
            } />
        </View>
    )
}