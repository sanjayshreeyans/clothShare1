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
    const ALGOLIA_ID = "2RC54JEYQ4";

    const Search_ID = "213f763bef6a347d940a29db2e8e2f42";

    const searchClient = algoliasearch(ALGOLIA_ID, Search_ID);
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
   
    const SearchBox = ({ currentRefinement, refine }) => {
      const [search, updateSearch] = React.useState();
      const screenWidth = Dimensions.get("window").width;
      const screenHeight = Dimensions.get("window").height;

       if (screenWidth > screenHeight) {
         return (
           <Header
             // containerStyle={styles.HeaderStyle}
             elevated={true}
             // containerStyle={styles.container}

             leftComponent={
               <View
                 style={{
                   flex: 1,
                   flexDirection: "row",
                   justifyContent: "center",
                   alignItems: "center",
                 }}
               >
                 <Text
                   style={{
                     // fontSize: "1.5rem"
                     fontSize: hp("4"),
                     fontWeight: "bold",
                     textAlign: "center",
                     justifyContent: "center",
                     alignItems: "center",
                     color: "white",
                   }}
                 >
                   ClothShare
                 </Text>

                 <TouchableOpacity
                   paddingTop={hp("2%")}
                   title="Sell"
                   color="purple"
                   onPress={() => navigation.navigate("adScreen")}
                   style={{
                     marginLeft: wp("2"),
                     width: wp("8%"),
                     height: hp("5%"),
                     justifyContent: "center",
                     borderRadius: 25,
                     backgroundColor: "rgb(90,210,138)",
                   }}
                 >
                   <Text
                     style={{
                       fontSize: hp("1.5"),
                       alignSelf: "center",
                       justifyContent: "center",
                       alignItems: "center",
                       color: "black",
                     }}
                   >
                     Sell or Rent
                   </Text>
                 </TouchableOpacity>

                 <SearchBar
                   round={true}
                   clearIcon={true}
                   lightTheme={true}
                   placeholderTextColor={"black"}
                   containerStyle={{
                     color: "white",
                     width: wp("50"),
                     paddingLeft: 30,
                     justifyContent: "center",
                     alignItems: "center",
                     alignSelf: "center",
                     backgroundColor: "transparent",
                     borderBottomColor: "transparent",
                     borderTopColor: "transparent",
                     borderTopWidth: 0,
                     borderBottomWidth: 0,
                   }}
                   inputContainerStyle={styles.containerSearch2}
                   inputStyle={{ color: "black" }}
                   placeholder="Type Here..."
                   value={currentRefinement}
                   onChange={(event) => refine(event.currentTarget.value)}
                 ></SearchBar>
               </View>
             }
             rightComponent={{ icon: "home", color: "#fff" }}
           />
         );
       } else if (screenHeight > screenWidth) {
         return (
           <Header
             // containerStyle={styles.HeaderStyle}
             elevated={true}
             // containerStyle={styles.container}

             centerComponent={
               <View style={{ flex: 1, flexDirection: "colum" }}>
                 <Text style={styles.paragraph}>ClothShare</Text>

                 <View
                   style={{
                     flex: 1,
                     flexDirection: "row",
                     justifyContent: "center",
                   }}
                 >
                   <TouchableOpacity
                     title="Sell"
                     color="purple"
                     onPress={() => navigation.navigate("adScreen")}
                     style={{
                       width: wp("13%"),
                       height: hp("5%"),
                       justifyContent: "center",
                       alignItems: "center",
                       borderRadius: 25,
                       backgroundColor: "rgb(90,210,138)",
                     }}
                   >
                     <Text
                       style={{
                         paddingLeft: 10,
                         fontSize: hp("1.5"),
                         alignSelf: "center",
                         justifyContent: "center",
                         alignItems: "center",
                         color: "black",
                       }}
                     >
                       Sell or Rent
                     </Text>
                   </TouchableOpacity>
                   <SearchBar
                     round={true}
                     clearIcon={true}
                     lightTheme={true}
                     placeholderTextColor={"black"}
                     containerStyle={{
                       // height: "10%",
                       color: "white",
                       width: wp("85"),
                       paddingTop: 0,
                       justifyContent: "center",
                       alignItems: "center",
                       alignSelf: "center",
                       backgroundColor: "transparent",
                       borderBottomColor: "transparent",
                       borderTopColor: "transparent",
                       borderTopWidth: 0, //works
                       borderBottomWidth: 0, //works
                     }}
                     inputContainerStyle={{
                       color: "black",
                     }}
                     inputStyle={{ color: "black" }}
                     placeholder="Type Here..."
                     value={currentRefinement}
                     onChange={(event) => refine(event.currentTarget.value)}
                   ></SearchBar>
                 </View>
               </View>
             }
             rightComponent={{ icon: "home", color: "#fff" }}
           />
         );
       }
    };

const CustomSearchBox = connectSearchBox(SearchBox);

    return (
      <View style={styles.container}>
        {/* <InstantSearch indexName="SearchCloth" searchClient={searchClient}>
          {" "}
          <CustomSearchBox></CustomSearchBox>
        </InstantSearch> */}

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

            <TouchableOpacity
              title="Proceed..."
              style={styles.roundButton2}
              // fontColor="white"
              // onPress={() => gatherAllAttribute()}
            >
              <Text style={styles.roundButton13}>Contact Seller</Text>
            </TouchableOpacity>
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
  containerSearch: {
    // height: "10%",
    color: "white",
    width: wp("100%"),
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
    fontSize: hp("3"),
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
    color: "black",
  },
  HeaderStyle: {
    width: wp("1%"),
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 10,
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
  paragraph4: {
    marginTop: wp("5%"),
    // fontSize: "1.5rem"
    fontSize: hp("4"),
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
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
    width: wp("15%"),
    height: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", // align
    marginTop: hp("2%"),
    borderRadius: 25,
    backgroundColor: "rgb(90,210,138)",
  },
});

