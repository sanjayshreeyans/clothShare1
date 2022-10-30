import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
  NavigatingContainer,
  Image,
  ImageBackground,
} from "react-native";


export default function SuccessfullySignedIn ({ navigation }) {


    

    return (
      <ImageBackground
      source={require("../Return.png")}
      resizeMode="cover"
      style={styles.image}>
      <View style={styles.container2}>
      <Text style={styles.paragraph}>Swiftoff</Text>
      </View>

      <View style={styles.container}>
              
      
      <Text style={styles.paragraph}>You have successfully signed in</Text>
      </View>
      </ImageBackground>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 0,
      zIndex: 2,
      justifyContent: "center",

      backgroundColor: "",
      paddingTop: 0,
      top: '40%',
    },
    image: {
      flex: 1,
      justifyContent: "center",
    },

    container2: {
      flex: 0,
      zIndex: 2,
      justifyContent: "center",

      backgroundColor: "",
      paddingBottom: 0,
      bottom: '40%',
    },

    paragraph: {
      margin: 24,
      fontSize: 65,
      fontWeight: "bold",
      textAlign: "center",
      color: "rgb(53,66,99)",
      
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
      flex: 1,
    },
    tinyLogo: {
      width: 200,
      height: 200,
      justifyContent: "center",
      alignSelf: "center",
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
  