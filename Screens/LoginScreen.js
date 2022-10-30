import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  NavigatingContainer,
  ImageBackground,
} from "react-native";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { initializeApp} from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';

import react from "react";

import { AppLoading } from "expo";

// Optionally import the services that you want to use
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";


//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";


import { getDatabase, ref, onValue, set, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC028SdBrLINPYDO1-xNfvO0X-fBu8P7-U",
  authDomain: "cloth-sharing.firebaseapp.com",
  projectId: "cloth-sharing",
  databaseURL: "https://cloth-sharing-default-rtdb.firebaseio.com/",
  storageBucket: "cloth-sharing.appspot.com",
  messagingSenderId: "218230174752",
  appId: "1:218230174752:web:5a9231bda0d88e8201b845",
  measurementId: "G-MQ3EEPR6QC",
};


initializeApp(firebaseConfig);

const auth = getAuth();
const db = getDatabase()

//  Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  //  Do other things
});

function storeHighScore(userId, score) {
  const db = getDatabase();
  
  const reference = ref(db, "users/" + userId);
  set(reference, {
    highscore: score,
  });
}


const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('test', value)
  } catch (e) {
    // saving error
  }
}

storeData("TESTING")
console.log("TESTING completed")



export default function LoginView({ navigation }) {
  const [text, onChangeText] = React.useState();
  

  

  
  // const image = {
  //   uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo80gWv-JmvV4MD-1DMuRA6ObgD04iinS_Jg&usqp=CAU",
  // };
  global.windowWidth = Dimensions.get("window").width;
  global.windowHeight = Dimensions.get("window").height;

  // if (Platform.OS == "ios" || Platform.OS == "android"); {
  //   console.log("IPHONE")
  //   global.img_style = styles.image2
  //   global.source = require("../phone_login.png")
  // }

  // if (Platform.OS == "web") {
  //   global.img_style = styles.image;
  //   global.source = require("../back.png");
  // }
  
  const [number, onChangeNumber] = React.useState(null);
  const [errorLabel, onChangeWrong] = React.useState(null);
  const [img_source, setImgSource] = React.useState(global.source)
  
  


  function LoginPage(email2, password2) {
    console.log(email2, password2, "Email and Password");
    // if (Platform.OS == "web") {
    //  email2 = "javangulasa@bentonvillek12.org" 
    //  password2 = "Sanjay@123"
    // }
    const db = getDatabase();
    if (email2 != null && password2 != null) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email2, password2)
        .then(() => {
          onChangeWrong("");

          // const starCountRef = ref(db, "Users_Login");
          // onValue(starCountRef, (snapshot) => {
          //   const data = snapshot.val();
          //   for (const i in data) {
          //     if (email2 == data[i]["email"]) {
          //       global.user_email = data[i]["email"]; // global variable

          //       console.log("The student's email: ", data[i]["email"]);

          //       global.user_grade = data[i]["Grade"];
          //       console.log("The student's grade: ", data[i]["Grade"]);

          //       global.user_password = data[i]["Password"];
          //       console.log("The student's password: ", data[i]["Password"]);

          //       global.user_name = data[i]["name"];
          //       console.log("The student's name: ", data[i]["name"]);

          //       global.is_new_user = data[i]["new_user"];
          //       console.log("If the user is a new user: ", data[i]["new_user"]);

          //       if (global.user_grade == "Teacher") { 

          //         global.room_no = data[i]["room_no"];

          //       }

          //     }
          //   }
          // });

          // for (const d in i)
          // {

          // }

          console.log("User account created & signed in!");

          navigation.replace("FlatScreen");
        })
        .catch((error) => {
          onChangeWrong(error);
          // err = error.message;
          console.error(error);
        });
    } else {
      onChangeWrong("Please fill in the fields and try again.");
      console.log("Please fill in the fields and try again");
    }
  }

  return (
    <View style={styles.overlay}>
      <Text style={styles.paragraph}>ClothShare</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Email:"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        placeholder="Password:"
        secureTextEntry={true}
        autoComplete="true"
      />

      <View style={styles.fixToText}>
        <TouchableOpacity
          title="Log In"
          color="purple"
          onPress={() => LoginPage(text, number)}
          style={styles.roundButton1}
        >
          <Text style={styles.roundButton13}>Log In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fixToText}>
        <TouchableOpacity
          title="Log In"
          color="blue"
          onPress={() => navigation.navigate("Signup")}
          style={styles.roundButton2}
        >
          <Text style={styles.roundButton14}>Create an Account</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input2}
          onChangeText={onChangeWrong}
          defaultValue={errorLabel}
          editable={false}
          selectTextOnFocus={false}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",

    backgroundColor: "white",
  },

  container2: {
    flex: 1,
    zIndex: 1,
    justifyContent: "center",

    backgroundColor: "white",
    padding: 0,
  },

  paragraph: {
    margin: 20,
    fontSize: 70,
    fontWeight: "bold",
    textAlign: "center",
    // SignPainter- HouseScript
  },
  input: {
    ...Platform.select({
      ios: {
        height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: 350,

    alignSelf: "center",
      },
      android: {
        height: 40,
    margin: 12,
    borderWidth: 1,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: 350,
      },
      default: {
        height: 40,
    margin: 12,
    borderWidth: 1,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: 400,

    alignSelf: "center",
      }
    })
  },

  fixToText: {
    alignSelf: "center",
    width: 200,
    borderRadius: 15,
    paddingTop: 20,
  },

  roundButton1: {
    width: 200,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 25,

    backgroundColor: "rgb(53,66,99)",
  },

  roundButton2: {
    width: 200,
    height: 50,
    paddingTop: 0,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 0,
    borderRadius: 25,

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
    fontSize: 16,
    textAlign: "center",
    color: "red",

    alignSelf: "center",
  },
  image2: {
    width: global.windowWidth,
    height: global.windowHeight,
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  overlay: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    opacity: 1,
    padding: "10",
  },
});
