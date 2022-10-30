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

// const Stack = createNativeStackNavigator();

export default function adScreen3({ navigation }) {

  const [selected, setSelectedMethod] = React.useState("");
  const [numericPrice, numericChange] = React.useState("");
  const [priceMethod, priceMethodChange] = React.useState("");
  const [disabledMethod, disabledChange] = React.useState(true);
  const data1 = [
    { key: "1", value: "Rent" },
    { key: "2", value: "Sell" },
    
  ];



  const didMount = React.useRef(false);

  //   React.useEffect(() => {
  //     const func = async () => {
  //       const storage = getStorage();
  //       const reference = refS(storage, "/image_sample.png");
  //       await getDownloadURL(reference).then((x) => {
  //         setUrl(x);
  //       });
  //     };
  //     func();
  //   }, []);
 
  //   console.log(url, cou++);
  
  const data = [{ key: "1", value: "Jammu & Kashmir" }];

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("test");
      if (value !== null) {
        console.log("value from home: ", value);
      }
    } catch (e) {
      // error reading value
    }
  };
  getData();



  function make_square_elms(value) {
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    if (screenWidth > screenHeight) {
      console.log(screenWidth, screenHeight, "Choosing WUDTH");
      return wp(value);
    } else if (screenHeight > screenWidth) {
      console.log(screenWidth, screenHeight, "Choosing HEGHT");
      return hp(value);
    }
  }

  function changeUIBasedOnBuy () {

    console.log(selected)
    if (selected == 2) {

      console.log("The user choose to sell the product.")
      disabledChange(false)
      console.log("The value1: ", disabledMethod);
      console.log("The value2: ", !disabledMethod);
    }

    if (selected == 1) {

      console.log("The user choose to rent the product.")
       disabledChange(true);
       console.log("The value1: ", disabledMethod);
       console.log("The value2: ", !disabledMethod);
    }


  }


function onChangedNumeric(txt) {
    console.log(navigation.getParam("descriptionLabel"))
    let newText = '';
    let numbers = '0123456789.';

    var text = txt.replace("$", "")
    console.log(text)
    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            numericChange(newText);
            console.log("please enter numbers only");
        }
    }
    numericChange(newText);
}

  return (
    <View style={styles.container}>
      <View style={{ height: hp("5%") }}></View>
      {/* How to create a button i n react native */}
      <Text
        style={{
          fontWeight: "bold",
          color: "#c2c2c2",
          paddingBottom: hp("3%"),
        }}
      >
        {" "}
        Sell or Rent:{" "}
      </Text>
      <SelectList
        setSelected={setSelectedMethod}
        data={data1}
        boxStyles={{ width: wp("60%") }}
        onSelect={() => changeUIBasedOnBuy()}
        placeholder="Sell or Rent"
        // dropdownStyles={{ marginHorizontal: wp("20%"), width: wp("20") }}
        // onSelect={() => alert(selected)}
      />

      <Text
        style={{
          fontWeight: "bold",
          color: "#c2c2c2",
          paddingTop: hp("3%"),
          paddingBottom: hp("3%"),
        }}
      >
        Price:
      </Text>
      <TextInput
        style={styles.inputPrice}
        onEndEditing={numericChange}
        keyboardType="number-pad"
        onChangeText={(text) => onChangedNumeric(text)}
        value={"$" + numericPrice}
        placeholder="Tell us more about the product:"
        placeholderTextColor="black"
      />

      <Text
        style={{
          fontWeight: "bold",
          color: "#c2c2c2",
          paddingTop: hp("3%"),
          paddingBottom: hp("3%"),
        }}
      >
        Pricing Method:
      </Text>

      <Picker
        style={{
          width: wp("60%"),
          height: hp("5%"),
          borderRadius: hp("1%"),
          backgroundColor: "rgb(239,239,239)",
        }}
        selectedValue={priceMethod}
        onValueChange={(itemValue, itemIndex) => priceMethodChange(itemValue)}
        enabled={disabledMethod}
      >
        <Picker.Item label="Pricing Method:" value="no value selected" />
        <Picker.Item label="Price per day" value="daily" />
        <Picker.Item label="Price per hour" value="hourly" />
      </Picker>

      <View style={{ height: hp("5%") }}></View>

      <Button
        title="NEXT"
        raised={true}
        onPress={() => navigation.navigate("adScreen4", {

          titleLabel: navigation.getParam("titleLabel"),
          image: navigation.getParam("image"),
          descriptionLabel: navigation.getParam("descriptionLabel"),
          selectedCondition: navigation.getParam("selectedCondition"),
          selectedMethod: selected,
          numericPrice: numericPrice,
          pricingMethod: priceMethod,


        })}
        titleStyle={{ paddingLeft: 20 }}
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
    borderRadius: 15,
    padding: 10,
    width: wp("70%"),

    alignSelf: "center",
  },

  inputPrice: {
    height: hp("12%"),
    fontSize: hp("4%"),

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
