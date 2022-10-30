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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header } from "react-native-elements";
import { SearchBar } from "react-native-elements";
import { Image } from "react-native";
import { Card, ListItem} from "react-native-elements";
import { getDownloadURL, getStorage } from "firebase/storage";
import { ref as refS } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { Touchable } from "react-native-web";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

export default function adScreen({ navigation }) {
  const [url, setUrl] = React.useState();
  const [titleLabel, onChangetitle] = React.useState(null);
  const [image, setImage] = React.useState(
    require("../upload-photo.jpeg")
  ); // Stores the user picked Image
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


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
  }, [url]);

  function make_square_elms (value) {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    if (screenWidth > screenHeight) {
      console.log(screenWidth, screenHeight, "Choosing WUDTH")
      return wp(value)
    }

    else if (screenHeight > screenWidth) {
      console.log(screenWidth, screenHeight, "Choosing HEGHT");
      return hp(value);
    }
    
  }
  
  return (
    <View style={styles.container}>
      {/* How to create a button in react native */}
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
                  style={styles.roundButton23}
              >
                <Text style={styles.roundButton15}>Sell or Rent</Text>
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

      <View
        style={{ width: 200, height: hp("2%"), alignItems: "center" }}
      ></View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: make_square_elms("36%"),
              height: make_square_elms("36%"),
              resizeMode: "center",
            }}
          />
        )}

        <View style={{ width: 200, height: 19 }}></View>
        <TouchableOpacity
          title="Pick an image from camera roll"
          style={styles.roundButton2}
          fontColor="white"
          onPress={pickImage}
        >
          <Text style={styles.roundButton13}>
            Pick an image from camera roll
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={onChangetitle}
        defaultValue={titleLabel}
        editable={true}
        placeholder="Enter a title: "
        selectTextOnFocus={true}
      />

      {/* <TouchableOpacity
        title="Pick an image from camera roll"
        style={styles.roundButton2}
        fontColor="white"
        
      >
        <Text style={styles.roundButton13}>Next</Text>
      </TouchableOpacity> */}

      <Button
        title="NEXT"
        raised={true}

        titleStyle={{ paddingLeft: 20 }}
        style={{width:wp("50%"), height:hp("10%"), marginLeft:wp("25%")}}
        onPress={() =>
          navigation.navigate("adScreen2", {
            titleLabel: titleLabel,
            image: image,
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

      {/* <Stack.Navigator>
            <Stack.Screen
              name="HomeView"
              component={HomeView}
              options={{ title: "My home" }}
            />
          </Stack.Navigator> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
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
    // height: "10%",
    color: "white",
    width: wp("50"),
    paddingTop: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    borderTopWidth: 0, //works
    borderBottomWidth: 0, //works
  },
  containerSearch2: {
    textColor: "black",
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
    fontSize: 35,
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
    height: hp("5%"),
    margin: 12,
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

  roundButton23: {
    width: wp("6%"),
    height: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("2%"),
    borderRadius: 25,
    backgroundColor: "rgb(90,210,138)",
  },
  // SignPainter- HouseScript 98.0
  roundButton13: {
    fontSize: 20,
    color: "white",
  },
  roundButton15: {
    fontSize: 15,
    color: "black",
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
    height: 200,
  },
  HeaderStyle: {
    width: "110%",
    height: "8%",
    flexDirection: "row",
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
