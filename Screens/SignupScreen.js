import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  NavigatingContainer,
  Dropdown,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import * as React from "react";

import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";

export default function SignupView({ navigation }) {
  const [email, onChangeEmail] = React.useState(null);
  
  const [password, onChangePassword] = React.useState(null);
  const [name, onChangeName] = React.useState(null);
  const [errorLabel, onChangeWrong] = React.useState(null);

  const [selectedLanguage, setSelectedLanguage] = React.useState();

  function SignupPage() {
    // // Remove when deploying the app.
    // email2="javangulasa@bentonvillek12.org"
    // password2="Sanjay@123"

    // // Remove when deploying the app.
    // const db = getDatabase();
    if (
      email != null &&
      password != null &&
      name != null &&
      selectedLanguage != null
    ) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          onChangeWrong("");
          console.log("User account created & signed in!");

          if (selectedLanguage == "7th Grade") {
            const db = getDatabase();
            const refGrade = ref(db, ("7th Grade/" + name  + "Login Info"));

            var login_info = {
              name: name,
              Grade: "7th Grade",
              Password: password,
              email: email,
              new_user: true,
            };

            set(refGrade, login_info);

            const refLogin = ref (db, ("Users_Login/"+name))
            set(ref23, login_info);


            
            const refSignouts = ref(db, ("7th Grade/"+name+"Signouts"))
            set(refSignouts, { "Info about field": "All Signouts" });

            console.log("Got the user ready, check the database ")



          }

          if (selectedLanguage == "8th Grade") {
            const db = getDatabase();
            const refGrade = ref(db, "8th Grade/" + name + "Login Info");

            var login_info = {
              name: name,
              Grade: "8th Grade",
              Password: password,
              email: email,
              new_user: true,
            };

            set(refGrade, login_info);

            const refLogin = ref(db, "Users_Login/" + name);
            set(ref23, login_info);

            const refSignouts = ref(db, "8th Grade/" + name + "Signouts");
            set(refSignouts, { "Info about field": "All Signouts" });

            console.log("Got the user ready, check the database ");
          }

          navigation.navigate("HomeScreen");
        })

        .catch((error) => {
          onChangeWrong(error);
          // err = error.message;
          console.error(error);
        });
    } else {
      onChangeWrong("Please fill in the fields and try again.");
      console.log(name, selectedLanguage, password, "All the stf");
    }
  }

  return (
    <ImageBackground
    source={require("../SignUP.png")}
      resizeMode="cover"
      style={styles2.image}>

<View style={styles2.container}>
      <Text style={styles2.paragraph}>Swiftoff</Text>
      <Text style={styles2.paragraph}>Signup</Text>

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

<Picker
        style={styles2.input}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Grade:" value="unknown" />
        <Picker.Item label="7th Grade" value="7th Grade" />
        <Picker.Item label="8th Grade" value="8th Grade" />
      </Picker>

      

      <View style={styles2.fixToText}>
        <TouchableOpacity
          title="Sign Up"
          color="orange"
          onPress={() => SignupPage()}
          style={styles2.roundButton2}
        >
          <Text style={styles2.roundButton14}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles2.fixToText}>
        <TouchableOpacity
          title="Sign Up"
          color="purple"
          onPress={() => navigation.navigate("TeacherSignupScreen")}
          style={styles2.roundButton1}
        >
          <Text style={styles2.roundButton13}>Teacher Sign up</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles2.input2}
        onChangeText={onChangeWrong}
        defaultValue={errorLabel}
        editable={false}
        selectTextOnFocus={false}
      />
    </View>
    </ImageBackground>

    
    
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "",
    padding: 0,
  },
  paragraph: {
    margin: 24,
    fontSize: 70,
    fontWeight: "bold",
    textAlign: "center",
    color: "orange",
    // SignPainter- HouseScript
    // fontFamily: "SignPainter",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: 400,
    justifyContent: "center",

    alignSelf: "center",
    
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  fixToText: {
    alignSelf: "center",
    width: 200,
    borderRadius: 15,
    paddingTop: 20,
  },

  roundButton1: {
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 15,

    backgroundColor: "purple",
  },

  roundButton2: {
    width: 200,
    height: 40,
    paddingTop: 0,
    justifyContent: "center",
    alignItems: "center",
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

    alignSelf: "center",
  },
});
