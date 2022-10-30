import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Dimensions, PixelRatio } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import useEffect from "react"
import { Button, Header } from "react-native-elements";
import { SearchBar } from "react-native-elements";
import * as React from "react";
import { getDatabase, ref, onValue, set, push, update, get  } from "firebase/database";

import { RangeSlider } from "react-instantsearch-dom";
import {
    connectSearchBox,
    Configure,
    Menu,
    HierarchicalMenu,
} from "react-instantsearch-dom";
import { Panel, RefinementList, MenuSelect, ToggleRefinement, SortBy} from "react-instantsearch-dom";
// import { RefinementList } from "react-instantsearch-hooks-web";
// import { ToggleRefinement } from "react-instantsearch-dom";
// how to import  connectSearchBox from algolia react instant search?
// import {connectToggleRefinement} from "react-instantsearch-dom"
import { CheckBox } from "react-native-elements";
import { getDownloadURL, getStorage } from "firebase/storage";
import { ref as refS } from "firebase/storage";

import { Icon } from "react-native-elements";
import algoliasearch from 'algoliasearch'
import { InstantSearch, SearchBox, Hits} from "react-instantsearch-dom";

import { InfiniteHits } from "react-instantsearch-dom";

export default function detailAdScreenBuyer({navigation, route}) {
    const [adId, setadId] = React.useState("No")
    const [numericPrice, setnumericPrice] = React.useState("No")
    const [priceMethod, setPriceMethod] = React.useState("No")
    const [condition, setCondition] = React.useState("No")
    const [stateAndCity, setSelectedCity] = React.useState("No")
    const [title, setTitle]  = React.useState("No")
    const [description, setDescription] = React.useState("No")

    var d = null
    const db = getDatabase()
    function getId ( ) {
        const refToAd = ref(db, ("ADS/" + navigation.getParam("adId")))
        get(refToAd).then((snapshot) => {
            if (snapshot.exists()) {
                d = snapshot.val()
                setnumericPrice(d['numericPrice'])

                if (d[ "selectedCondition"] == "1") { //
                
                setCondition("Used Fair")
                }

                 if (d["selectedCondition"] == "2") {
                   //

                   setCondition("Normal Wear");
                 }

                  if (d["selectedCondition"] == "3") {
                    //

                    setCondition("Brand new");
                  }

                  
                setSelectedCity((d['selectedCity'] + ', ' +d['selectedState']))

                if (d["selectedMethod"] == "1") {
                  //

                  setPriceMethod("Rent");
                }

                if (d["selectedMethod"] == "2") {
                  //

                  setPriceMethod("Sell");
                }

                setTitle(d['titleLabel'])

                setDescription(d['descriptionLabel'])
                console.log(d)

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }

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

    React.useEffect(() => {
        // write your code here, it's like componentWillMount
        getId();
    }, [])
    console.log(adId, "Detail Ad screen buyer")


    return (
      <View style={styles.container}>
        <View>
          {/*<Button onPress={() => getId()}>*/}
          {/*</Button>*/}
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
        </View>

        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: navigation.getParam("imgLink") }}
            style={{
              height: make_square_elms("20%"),
              width: make_square_elms("20%"),
              marginTop: hp("5"),
              marginLeft: wp("5%"),
            }}
          ></Image>
          <View
            style={{
              flexDirection: "column",
              marginTop: hp("5"),
              paddingLeft: wp("10"),
              marginBottom: hp("15%"),
              flex: 1,
            }}
          >
            <Text style={styles.listHeadline}>{title}</Text>

            <Text style={styles.listHeadline}>Price: ${numericPrice}</Text>

            <Text style={styles.listHeadline}>Condition: {condition}</Text>

            <Text style={styles.listHeadline}>Posted in {stateAndCity}</Text>

            <Text style={styles.listHeadline}>
              Pricing Method: {priceMethod}
            </Text>

            <Text style={styles.listHeadline}>Description: </Text>
            <Text style={styles.listHeadline}>{description}</Text>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInsta: {
    flex: 1,
    // alignItems: "left",
    // justifyContent: "top",
    width: "100%",
    height: "100%",
    // justifyContent: "center", //Centered vertically
    // alignItems: "center", // Centered horizontally
  },
  containerFilter: {
    // alignItems: "left",
    alignItems: "flex-end",
    // justifyContent: "top",

    width: "20%",
    height: "100%",
    // justifyContent: "center", //Centered vertically
    // alignItems: "center", // Centered horizontally
  },
  containerInsta2: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "top",
    width: "100%",
    height: "100%",
    // justifyContent: "center", //Centered vertically
    // alignItems: "center", // Centered horizontally
  },

  listHeader: {
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#7B52AB",
  },

  listHeadline: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: hp("5"),
  },

  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },

  item2: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "left",
    paddingVertical: 13,
  },

  avatarContainer: {
    borderRadius: 100,
    height: 230,
    width: 89,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100,
  },

  avatar: {
    height: 200,
    width: 200,
  },

  name: {
    fontWeight: "600",
    fontSize: 30,
    marginLeft: 100,
  },

  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
  containerSearch: {
    // height: "10%",
    color: "white",
    width: "80%",
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
  HeaderStyle: {
    width: "110%",
    height: "8%",
    flexDirection: "row",
  },

  invisibleButtonStyle: { width: wp("100%"), height: hp("40%") },

  paragraph: {
    margin: 24,
    // fontSize: "1.5rem"
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  paragraph2: {
    margin: 24,
    // fontSize: "1.5rem"
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },

  roundButton2: {
    width: wp("6%"),
    height: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "bottom", // align
    marginTop: hp("2%"),
    borderRadius: 25,
    backgroundColor: "rgb(90,210,138)",
  },
});

