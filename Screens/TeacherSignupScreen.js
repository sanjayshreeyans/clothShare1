import { Text, View, StyleSheet, Button, TouchableOpacity, NavigatingContainer, Dropdown, ImageBackground} from 'react-native';
import { TextInput } from "react-native-web";


import * as React from 'react';

export default function TeacherSignupView ({ navigation }) {
    const [email, onChangeEmail] = React.useState(null);

    const [password, onChangePassword] = React.useState(null);
    const [name, onChangeName] = React.useState(null);
    const [access, onChangeAccess] = React.useState(null);
    const [errorLabel, onChangeWrong] = React.useState(null);
    const [roomNumber, onChangeRoomNumber] = React.useState(null);

    const [selectedLanguage, setSelectedLanguage] = React.useState();
   
    return (


        <ImageBackground
        source={require("../SignUP.png")}
      resizeMode="cover"
      style={styles2.image}>
<View style={styles2.container}>
            <Text style={styles2.paragraph}>Swiftoff</Text>
            


            
            <Text style={styles2.paragraph}>
                Teacher Signup
            
                
            </Text>

            <TextInput
                style={styles2.input}
                onChangeText={onChangeName}

                placeholder="Full Name:"
            />


            <TextInput
                style={styles2.input}
                onChangeText={onChangeEmail}

                placeholder="Email:"
            />

            <TextInput 
                style={styles2.input}
                onChangeText={onChangePassword}

                placeholder="Password:"
            />

            <TextInput 
                style={styles2.input}
                onChangeText={onChangeAccess}

                placeholder="Access Code:"
            />

            <TextInput 
                style={styles2.input}
                onChangeText={onChangeRoomNumber}
                

                placeholder="Room Number:"
            />

            


            <View style={styles2.fixToText}>
                <TouchableOpacity
                    title="Sign Up"


                    color="light purple"
                    onPress={() => signup()}

                    style={styles2.roundButton2}>

                    <Text style={styles2.roundButton14}>
                        Sign Up
                    </Text>

                </TouchableOpacity>

                <TextInput 
                style={styles2.input2}
                value={errorLabel}

                placeholder=""

                editable={false}
             selectTextOnFocus={false}
            />

                

            </View>
    </View>
        </ImageBackground>

    
        
 
    
)

function signup(){
    if (Number(roomNumber )){
    onChangeWrong((roomNumber))
    
    }


    else {

        onChangeWrong("Please enter only numbers!!!");


    }


    
   

}

}


const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        backgroundColor: '',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "purple",
        // SignPainter- HouseScript
        // fontFamily: 'SignPainter',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        width: 400,

        alignSelf: 'center',
    },

    fixToText: {

        alignSelf: "center",
        width: 200,
        borderRadius: 15,
        paddingTop: 20

    },

    roundButton1: {
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        padding: 10,
        borderRadius: 15,

        backgroundColor: 'purple',
    },




    roundButton2: {
        width: 200,
        height: 40,
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        padding: 0,
        borderRadius: 15,

        backgroundColor: "rgb(239,139,118)",
    },
    // SignPainter- HouseScript 98.0
    roundButton13: {
        fontSize: 20,
        color: "white",
    },
    roundButton14: {
        fontSize: 20,
        color: "white",



    },
    input2: {
        height: 40,
        margin: 12,
        borderWidth: 0,
        borderWidth: 0,
        borderRadius: 15,
        padding: 10,
        width: 400,
        color: "red",
        textAlign: "center",

        alignSelf: 'center',


    },
    image: {
        flex: 1,
        justifyContent: "center",
      },
});

    

/*

Auth Initialization

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

*/