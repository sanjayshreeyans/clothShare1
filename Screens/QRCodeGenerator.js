import QRCode from 'react-native-qrcode-svg';
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity,
    NavigatingContainer,
    ImageBackground,
  } from "react-native";
// Simple usage, defaults for all but the value
import { getDatabase, ref, onValue, set } from "firebase/database";
export default function QRCodeGenerator ({ navigation }) {

   

    

   var path = [
     String(global.user_grade) +
       "," +
       String(global.user_name) +
       "," +
       "Signouts" +
       "," +
       String(global.date),
   ];
  console.log(path, "Fronm QR Generator");
   if (global.grade != "TEACHER") {
     
     const db = getDatabase();

     const starCountRef = ref(
       db,
       global.user_grade + "/" + global.user_name + "/Signouts/" + global.date
     );
     
     onValue(starCountRef, (snapshot) => {

       const data = snapshot.val();

       if (data['Completed full Cycle'] == true) {
        navigation.navigate("SuccessfullySignedIn");
       }
       
     });
   }    

  
  return (
    <ImageBackground
      source={require("../Scan.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.overlay}>
      <Text style={styles.paragraph}>Egress</Text>

        <QRCode value={path} size={200} />

        <Text style={styles.paragraph}>
          You are welcome to leave the classroom, {"\n"}
          show the generated QRCode to {"\n"} the teacher when you return to the
          classroom.
        </Text>
      </View>
    </ImageBackground>
  );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 2,
      justifyContent: "center",
      alignSelf: "center",
      backgroundColor: "white",
      padding: 8,
    },
  
    container2: {
      flex: 1,
      zIndex: 1,
      justifyContent: "center",
  
      backgroundColor: "white",
      padding: 8,
    },
  
    paragraph: {
      margin: 4,
      fontSize: 35,
      justifyContent: "center",
      fontWeight: "bold",
      textAlign: "center",
      paddingTop: 40,
      fontFamily: "SignPainter",
      // SignPainter- HouseScript
      
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
    },
  });
  