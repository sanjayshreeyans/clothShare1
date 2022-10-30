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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SelectList from "react-native-dropdown-select-list";
import {getDownloadURL, getStorage, uploadString, ref as refS} from "firebase/storage";
import { getDatabase, ref, onValue, set, push, update } from "firebase/database";
import algoliasearch from "algoliasearch";
// const Stack = createNativeStackNavigator();
export default function adScreen5({ navigation}) {

  const [imageLink, setImageLink] = React.useState();
  function gatherAllAttribute() {
    // console.log(navigation.getParam("titleLabel"))
    // console.log(navigation.getParam("image"))
    console.log(navigation.getParam("descriptionLabel"), "DEFAULT_STATE")
    // console.log(navigation.getParam("selectedCondition"))
    // console.log(navigation.getParam("selectedMethod"))
    // console.log(navigation.getParam("numericPrice"))
    // console.log(navigation.getParam("pricingMethod"))
    // console.log(navigation.getParam("selectedCity"))
    // console.log(navigation.getParam("selectedState"))
    const db = getDatabase();

    const referenceADS = ref(db, "ADS");

    // const pusher = push(db, referenceADS);
    var refd = ref(db, "ADS");

    var newChildRef = push(refd, { firstChild: true });

    console.log(newChildRef.key, "OPPPAFDF");

    const storage = getStorage();

    uploadString(
      refS(storage, "/" + newChildRef.key),
      navigation.getParam("image"),
      "data_url"
    ).then((snapshot) => {
      console.log("Uploaded a blob or file!");

      

      sendToSearchIndex((newChildRef.key))


    });


    var adInfo = {
      titleLabel: navigation.getParam("titleLabel"),
      descriptionLabel: navigation.getParam("descriptionLabel"),
      selectedCondition: navigation.getParam("selectedCondition"),
      selectedMethod: navigation.getParam("selectedMethod"),
      numericPrice: navigation.getParam("numericPrice"),
      pricingMethod: navigation.getParam("pricingMethod"),
      selectedCity: navigation.getParam("selectedCity"),
      selectedState: navigation.getParam("selectedState"),
      image: newChildRef.key,
    };
    const u = ref(db, "ADS/" + newChildRef.key);
    set(u, adInfo);

    
    
    
    
   
  }

  function sendToSearchIndex(idName){
    const storage = getStorage();
    const func = async () => {
      const reference = refS(storage, "/" + idName);
      await getDownloadURL(reference).then((x) => {
        setImageLink(x);
        console.log(x)
        const ALGOLIA_ID = "2RC54JEYQ4";
        const ALGOLIA_ADMIN_KEY = "daf45e83f6667ed440637fe3e76528cb";
        const ALGOLIA_INDEX_NAME = "SearchCloth";

        const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

        const index = client.initIndex(ALGOLIA_INDEX_NAME);

        const dat = {
          "Title": navigation.getParam("titleLabel"),
          "Price": navigation.getParam("numericPrice"),
          "Location":
              navigation.getParam("selectedCity") +
              ", " +
              navigation.getParam("selectedState"),
          "image": x,
        };

        index.saveObject({
          objectID: idName,
          ...dat,
        });
        console.log("Done sending it to search index");

      })

    }

    func();


  }

  return (
    <View style={styles.container}>
      <Text style={styles.fixToText}>Getting Ready To Post The AD...</Text>
      <Button onPress={() => gatherAllAttribute()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    flex:1
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
    fontSize:hp("2%"),
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
    fontSize: 20

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
