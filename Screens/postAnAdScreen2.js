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

export default function adScreen2({ navigation }) {

  const [url, setUrl] = React.useState(null);
  const [selected, setSelected] = React.useState("");
  const [descriptionLabel, descriptionChange] = React.useState("");
  const data1 = [
    { key: "1", value: "Business Attire" },
    { key: "2", value: "Casual Wear" },
    { key: "3", value: "Formal Wear" },
    { key: "4", value: "Sportswear" },
  ];

  const data2 = [
    { key: "1", value: "Used Fair" },

    { key: "2", value: "Normal Wear" },
    { key: "3", value: "Brand new" },
  ];

  var cou = 0;

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

  const [search, updateSearch] = React.useState();
  console.log(search);
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

  React.useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (url == undefined) {
      console.log(url, "!URL 1");
      document.title = "Threshold of over 1 reached.";
    } else {
      console.log(url, "!URL 3");
      global.users = [
        {
          name: "brynn",
          avatar: url,
        },
      ];

      document.title = "No threshold reached.";
    }
  },  [url]);

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

  return (
    <View style={styles.container}>
      <Header
        // containerStyle={styles.HeaderStyle}
        elevated={true}
        // containerStyle={styles.container}
        leftComponent={
          <View style={styles.HeaderStyle}>
            {/* <Icon
              raised
              name="arrow-back"
              type="material"
              color="#f50"
              onPress={() => navigation.navigate("HomeScreen")}
            /> */}

            <Text style={styles.paragraph}>ClothShare</Text>

            <TouchableOpacity
              paddingTop={hp("2%")}
              title="Sell"
              color="purple"
              onPress={() => navigation.navigate("adScreen")}
              style={styles.roundButton2}
            >
              <Text style={styles.roundButton13}>Sell or Rent</Text>
            </TouchableOpacity>
          </View>
        }
        centerComponent={
          <SearchBar
            round={true}
            clearIcon={true}
            lightTheme={true}
            placeholderTextColor={"black"}
            containerStyle={styles.containerSearch}
            inputContainerStyle={styles.containerSearch2}
            inputStyle={{ color: "black" }}
            placeholder="Type Here..."
          ></SearchBar>
        }
        rightComponent={{ icon: "home", color: "#fff" }}
      />

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
        Category:{" "}
      </Text>
      <SelectList
        setSelected={setSelected}
        data={data1}
        boxStyles={{ width: wp("40%") }}
        placeholder="Select a Category"
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
        Condition:
      </Text>
      <SelectList
        setSelected={setSelected}
        data={data2}
        boxStyles={{ width: wp("40%") }}
        placeholder="Select a Condition"
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
        Description:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={descriptionChange}
        multiline={true}
        placeholder="Tell us more about the product:"
        placeholderTextColor="black"
      />

      <View style={{ height: hp("5%") }}></View>

      <Button
        title="NEXT"
        raised={true}
        titleStyle={{ paddingLeft: 20 }}
        onPress={() =>
          navigation.navigate("adScreen3", {
            titleLabel: navigation.getParam("titleLabel"),
            image: navigation.getParam("image"),
            descriptionLabel: descriptionLabel,
            selectedCondition: selected,
          })
        }
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
    flex: 1
  },
  image: {
    width: 200,
    height: 200
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
