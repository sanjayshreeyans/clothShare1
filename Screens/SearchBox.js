import React, { useRef, useState } from "react";
import { StyleSheet, View, TextInput, Dimensions, Text, TouchableOpacity} from "react-native";
import { useSearchBox } from "react-instantsearch-hooks";
import { Button, Header, SearchBar } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { set } from "firebase/database";

export function SearchBox(props) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(null);
  const inputRef = useRef(null);

  function setQuery(newQuery) {
      console.log(newQuery);
    setInputValue(newQuery);
    setInputValue(newQuery)
    refine(newQuery);
  }

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  // if (query !== inputValue && !inputRef.current?.isFocused()) {
  //   setInputValue(query);
  // }

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  if (screenWidth > screenHeight) {
    return (
      <Header
        // containerStyle={styles.HeaderStyle}
        elevated={true}
        // containerStyle={styles.container}

        centerComponent={
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
              <Text
                style={{
                  fontSize: hp("1.5"),
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "right",
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
              value={inputValue}
              onChange={(event) => setQuery(event.currentTarget.value)}
            ></SearchBar>
          </View>
        }
        rightComponent={{ icon: "home", color: "#fff" }}
      />
    );
  } 

  else if (screenHeight > screenWidth) {
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
                value={inputValue}
                onChange={(event) => setQuery(event.currentTarget.value)}
                clearIcon={false}
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
              ></SearchBar>
            </View>
          </View>
        }
        rightComponent={{ icon: "home", color: "#fff" }}
      />
    );
  }

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
    alignSelf: "auto",
    justifyContent: "space-evenly",
    alignItems: "baseline",
    color: "black",
  },
});
