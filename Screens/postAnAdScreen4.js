import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  NavigatingContainer,
  ImageBackground,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
// TODO: CONFIGURE THE ICONS WHEN DEPLOYING: https://github.com/oblador/react-native-vector-icons
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SelectList from "react-native-dropdown-select-list";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header } from "react-native-elements";
import { SearchBar } from "react-native-elements";
import { Image } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { getDownloadURL, getStorage } from "firebase/storage";
import { ref as refS } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { Touchable } from "react-native-web";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
  
// const Stack = createNativeStackNavigator();
import { City } from "country-state-city";
export default function adScreen4({ navigation }) {
   const [location, setLocation] = useState(null);
   const [errorMsg, setErrorMsg] = useState(null);
   const [selectedState, setSelectedState] = useState(null);
   const [selectedCity, setSelectedCity] = useState(null);
   const [listOfCities, setlistOfCities] = useState({
     key: "Please choose a state",
     value: "Please choose a state",
   });
   const states = [
     
       {key: "AL", value: "Alabama"},
       {key: "AK", value: "Alaska"},
       {key: "AZ", value: "Arizona"},
       {key: "AR", value: "Arkansas"},
       {key: "CA", value: "California"},
       {key: "CO", value: "Colorado"},
       {key: "CT", value: "Connecticut"},
       {key: "DE", value: "Delaware"},
       {key: "DC", value: "District Of Columbia"},
       {key: "FM", value: "Federated States Of Micronesia"},
       {key: "FL", value: "Florida"},
       {key: "GA", value: "Georgia"},
       {key: "GU", value: "Guam"},
       {key: "HI", value: "Hawaii"},
       {key: "ID", value: "Idaho"},
       {key: "IL", value: "Illinois"},
       {key: "IN", value: "Indiana"},
       {key: "IA", value: "Iowa"},
       {key: "KS", value: "Kansas"},
       {key: "KY", value: "Kentucky"},
       {key: "LA", value: "Louisiana"},
       {key: "ME", value: "Maine"},
       {key: "MH", value: "Marshall Islands"},
       {key: "MD", value: "Maryland"},
       {key: "MA", value: "Massachusetts"},
       {key: "MI", value: "Michigan"},
       {key: "MN", value: "Minnesota"},
       {key: "MS", value: "Mississippi"},
       {key: "MO", value: "Missouri"},
       {key: "MT", value: "Montana"},
       {key: "NE", value: "Nebraska"},
       {key: "NV", value: "Nevada"},
       {key: "NH", value: "New Hampshire"},
       {key: "NJ", value: "New Jersey"},
       {key: "NM", value: "New Mexico"},
       {key: "NY", value: "New York"},
       {key: "NC", value: "North Carolina"},
       {key: "ND", value: "North Dakota"},
       {key: "MP", value: "Northern Mariana Islands"},
       {key: "OH", value: "Ohio"},
       {key: "OK", value: "Oklahoma"},
       {key: "OR", value: "Oregon"},
       {key: "PW", value: "Palau"},
       {key: "PA", value: "Pennsylvania"},
       {key: "PR", value: "Puerto Rico"},
       {key: "RI", value: "Rhode Island"},
       {key: "SC", value: "South Carolina"},
       {key: "SD", value: "South Dakota"},
       {key: "TN", value: "Tennessee"},
       {key: "TX", value: "Texas"},
       {key: "UT", value: "Utah"},
       {key: "VT", value: "Vermont"},
       {key: "VI", value: "Virgin Islands"},
       {key: "VA", value: "Virginia"},
       {key: "WA", value: "Washington"},
       {key: "WV", value: "West Virginia"},
       {key: "WI", value: "Wisconsin"},
       {key: "WY", value: "Wyoming"},
     
   ];

   let Cityi = require("country-state-city").City;


   function giveMeCities() {
   var cityLst = Cityi.getCitiesOfState("US", selectedState);
   var modList = []
   
    cityLst.forEach((i) => {
      
     

      modList.push({ key: i.name, value: i.name });

      
    });
    console.log(modList);
    
    setlistOfCities(modList);
    

   }
   useEffect(() => {
     (async () => {
       let { status } = await Location.requestForegroundPermissionsAsync();
       if (status !== "granted") {
         setErrorMsg("Permission to access location was denied");
         return;
       }

       let location = await Location.getCurrentPositionAsync({});
       setLocation(location);
     })();
   }, []);

   let text = "Waiting..";
   if (errorMsg) {
     text = errorMsg;
   } else if (location) {
     text = JSON.stringify(location);
   }

   return (
     <View style={styles.container}>
       <View style={{ height: hp("5%") }}></View>

       <Text
         style={{
           fontWeight: "bold",
           color: "#c2c2c2",
           paddingBottom: hp("3%"),
         }}
       >
         {" "}
         Select an State:{" "}
       </Text>

       <SelectList
         setSelected={setSelectedState}
         data={states}
         boxStyles={{ width: wp("60%")}}
         placeholder="State: "
         onSelect={() => giveMeCities()}

         // dropdownStyles={{ marginHorizontal: wp("20%"), width: wp("20") }}
         // onSelect={() => alert(selected)}
       />

       <View style={{ height: hp("5%") }}></View>
       <Text
         style={{
           fontWeight: "bold",
           color: "#c2c2c2",
           paddingBottom: hp("3%"),
         }}
       >
         Select an City:
       </Text>
       <SelectList
         setSelected={setSelectedCity}
         data={listOfCities}
         boxStyles={{ width: wp("60%") }}
         placeholder="Select an City: "

         // dropdownStyles={{ marginHorizontal: wp("20%"), width: wp("20") }}
         // onSelect={() => alert(selected)}
       />

       <View style={{ height: hp("5%") }}></View>

       <Button
         title="NEXT"
         raised={true}
         titleStyle={{ paddingLeft: 20 }}
         onPress={() => navigation.navigate("adScreen5", {

             titleLabel: navigation.getParam("titleLabel"),
             image: navigation.getParam("image"),
             descriptionLabel: navigation.getParam("descriptionLabel"),
             selectedCondition: navigation.getParam("selectedCondition"),
             selectedMethod: navigation.getParam("selectedMethod"),
             numericPrice: navigation.getParam("numericPrice"),
             pricingMethod: navigation.getParam("pricingMethod"),
             selectedState: selectedState,
             selectedCity: selectedCity


         })}
         icon={
           <Icon
             name="arrow-right"
             size={(wp("4%"), hp("4%"))}
             color="white"
             iconStyle={{ paddingRight: 20 }}
           />
         }
       />
     </View>
   );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
  },

  dropdown: {
    paddingVertical: hp("4%"),
    paddingHorizontal: wp("70%"),
    paddingTop: hp("2%"),
    borderRadius: wp("5%"),
    alignItems: "center",
    color: "#000000",

    justifyContent: "center",
  },

  containerCard: {
    width: "98%",
    height: "100%",
    padding: 0,
    borderWidth: 1,
  },
  containerCardMaster: {
    paddingLeft: "20%",
    paddingTop: "2%",
  },

  containerSearch: {
    height: "35%",
    color: "white",
    width: "80%",
    paddingTop: 15,
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    borderTopWidth: 0, //works
    borderBottomWidth: 0, //works
  },
  containerSearch2: {
    // textColor: "black",
    color: "black",
  },

  container2: {
    flex: 1,
    zIndex: 1,
    justifyContent: "center",

    // backgroundColor: "",
    padding: 8,
  },

  paragraph: {
    margin: 24,
    // fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  paragraphCard: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  input: {
    height: hp("25%"),

    borderWidth: 1,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: wp("70%"),

    alignSelf: "center",
  },

  inputPrice: {
    height: hp("12%"),
    fontSize: hp("4%"),

    borderWidth: 1,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: wp("30%"),

    alignSelf: "center",
  },

  fixToText: {
    alignSelf: "center",
    width: 200,
    borderRadius: 15,
    paddingTop: 0,
  },

  roundButton1: {
    width: 200,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 25,

    backgroundColor: "rgb(239,139,118)",
  },

  roundButton2: {
    width: 320,
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
    width: 200,
    height: 200,
  },

  overlay: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: 90,
    right: 0,
    bottom: 0,
    left: 0,

    opacity: 1,
  },
});
