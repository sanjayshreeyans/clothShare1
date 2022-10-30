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
import { initializeApp } from "firebase/app";
import react from "react";

import { AppLoading } from "expo";


export default function Redirecter({ navigation }) {
    return (
      <ImageBackground
      source={require("../Redirect.png")}
      resizeMode="100%"
      style={styles.image}>
<View style={styles.container}>
        <Text style={styles.paragraph}>Swiftoff</Text>
        <TouchableOpacity
          title="Log In"
          color="blue"
          onPress={() => navigation.replace("SignIn") }
          style={styles.roundButton2}
        >
            <Text style={styles.roundButton14}>Check In</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
      
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",

    backgroundColor: "",
    paddingTop: 0,
    top: '30%',
  },

  container2: {
    flex: 1,
    zIndex: 1,
    justifyContent: "center",

    backgroundColor: "white",
    padding: 8,
  },

  paragraph: {
    margin: 24,
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: 400,

    alignSelf: "center",
  },

  fixToText: {
    alignSelf: "center",
    width: 200,
    borderRadius: 15,
    paddingTop: 20,
    padding: 400,

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
    justifyContent: 'center',
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
  },
});
