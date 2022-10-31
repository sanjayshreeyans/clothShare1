import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dimensions, PixelRatio } from "react-native";
import { Button, Header } from "react-native-elements";
import { SearchBar } from "react-native-elements";
import * as React from "react";


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

export default function FlatListScreen({navigation, route}) {
  const ALGOLIA_ID = "2RC54JEYQ4";

  const Search_ID = "213f763bef6a347d940a29db2e8e2f42";

  const searchClient = algoliasearch(ALGOLIA_ID, Search_ID)
  
   const [search , updateSearch] = React.useState();
  const [url, setUrl] = React.useState();

  React.useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const reference = refS(storage, "/image_sample.png");
      await getDownloadURL(reference).then((x) => {
        setUrl(x);
      });
    };
    func();
  }, []);

  

  //  React.useLayoutEffect(() => {
   
  // }, [navigation]);
  const animals = [
    {
      id: 1,
      name: "Shark",
      image: url,
    },
    {
      id: 2,
      name: "Herring",
      image: url,
    },
    {
      id: 3,
      name: "Lion",
      image: url,
    },
    {
      id: 4,
      name: "Polar Bear",
      image: url,
    },
    {
      id: 5,
      name: "Penguin",
      image: url,
    },
    {
      id: 6,
      name: "Parrot",
      image: url,
    },
    {
      id: 7,
      name: "Parrot",
      image: url,
    },
    {
      id: 8,
      name: "Parrot",
      image: url,
    },
    {
      id: 9,
      name: "Parrot",
      image: url,
    },
  ];


  const oneAnimal = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.avatarContainer}>
        <Image source={{uri: item.image}} style={styles.avatar} />
      </View>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  const headerComponent = () => {
    return <Text style={styles.listHeadline}>Animals</Text>;
  };

  const listSeparator = () => {
    return <View style={styles.separator} />;
  };

const SearchBox = ({ currentRefinement, refine }) => {
  const[search, updateSearch] = React.useState();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  if (screenWidth > screenHeight) {
    return (
      <Header
        // containerStyle={styles.HeaderStyle}
        elevated={true}
        // containerStyle={styles.container}

        centerComponent={
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                // fontSize: "1.5rem"
                fontSize: hp("4"),
                fontWeight: "bold",
                textAlign: "center",
                marginLeft: wp("1"),
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
              <Text style={{
    fontSize: hp("1.5"),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "right",
    color: "black",
  }}>Sell or Rent</Text>
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

            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity
                paddingTop={hp("2%")}
                title="Sell"
                color="purple"
                onPress={() => navigation.navigate("adScreen")}
                style={{
                  width: wp("13%"),
                  height: hp("5%"),
                  marginTop: hp("2%"),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                  backgroundColor: "rgb(90,210,138)",
                }}
              >
                <Text style={styles.roundButton13}>Sell or Rent</Text>
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
                  paddingTop: 15,
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
  const [check1, setCheck1] = React.useState(false);
// const ToggleRefinement = ({
//   currentRefinement,
//   label,
//   count,
//   refine,
//   createURL,
// }) => {
//   return (
//     <CheckBox
//       center
//       title="Miyapur"
//       checked={check1}
//       onPress={(event) => {
//         event.preventDefault();
//         refine(!currentRefinement);
//       }}
//     />
//   );

//   // return the DOM output
// };
  function openDetailScreen (id, img) {

    console.log("Function has been called", id)
    navigation.navigate("detailScreen", {adId : id, imgLink: img})
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
  function HitFunc ({ hit })  {
    return (
      <View>
        <View style={styles.item}>
          <Image
            source={{ uri: hit.image }}
            style={{
              resizeMode: "contain",
              width: make_square_elms("20"),
              height: make_square_elms("20"),
            }}
          />
          <TouchableOpacity
            style={styles.item2}
            onPress={() => openDetailScreen(hit.objectID, hit.image)}
          >
            <Text style={styles.name}>{hit.Title}</Text>
            <View style={{ height: 10 }}></View>
            <Text style={styles.name}>{"$" + hit.Price}</Text>
            <View style={{ height: 30 }}></View>
            <Text style={styles.name}>{hit.Location}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
      </View>
    );
    
  }


const CustomSearchBox = connectSearchBox(SearchBox);
// const CustomToggleRefinement = connectToggleRefinement(ToggleRefinement);
// index
//   .setSettings({
//     searchableAttributes: [
//       "Title",
//       "Location",
      
//     ],
//   })
//   .then(() => {
//     // done
//   });
  return (
    <View style={styles.container}>
      <View style={styles.containerInsta}>
        <InstantSearch indexName="SearchCloth" searchClient={searchClient}>
          {/* <SearchBox
            style={styles.containerInsta2}
            max-width={100}
            translations={{
              submitTitle: "Submit your search query.",
              resetTitle: "Clear your search query.",
              placeholder: "Start Searching Now...",
            }}
          ></SearchBox> */}
          {/* <RefinementList attribute="Location" style={styles.containerInsta} /> */}

          <CustomSearchBox></CustomSearchBox>
          {/* <Configure
            facetFilters={["Location:Miyapur", "Fashion"]}
            analytics={false}
          ></Configure> */}

          {/* <MenuSelect
            attribute="Location"
            defaultRefinement={"Miyapur"}
          /> */}

          {/* <Configure
            
            facetFilters={["Location:Tampa, FL"]}
            analytics={false}></Configure> */}

          <InfiniteHits hitComponent={HitFunc} style={styles.containerInsta} />
          <View style={styles.item2}>
            <Text>Locations</Text>
            <HierarchicalMenu attributes={["Location"]} />
          </View>
        </InstantSearch>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // justifyContent: "center", //Centered vertically
    // alignItems: "center", // Centered horizontally
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
    fontSize: 21,
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
    height: hp("15"),
    width: wp("3"),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp("10"),
  },

  avatar: {},

  name: {
    fontWeight: "600",
    fontSize: hp("3"),
    marginLeft: wp("18"),
  },

  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
  containerSearch: {
    // height: "10%",
    color: "white",
    width: wp("95"),
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
    color: "black"
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

  roundButton13: {
    paddingLeft: 10,
    fontSize: hp("1.5"),
    alignSelf: "right",
    justifyContent: "right",
    alignItems: "right",
    color: "black",
  },
});
