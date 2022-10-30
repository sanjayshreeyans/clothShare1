import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, SearchBox, Button } from "react-native";
import PropTypes from "prop-types";
import { connectRefinementList } from "react-instantsearch-native";
import { InstantSearch } from "react-instantsearch-native";
import { InfiniteHits } from "react-instantsearch-dom";
const algoliasearch = require("algoliasearch");
import { getDownloadURL, getStorage } from "firebase/storage";
import { ref as refS } from "firebase/storage";   


const styles = StyleSheet.create({
    paragraph: {
    margin: 20,
    fontSize: 70,
    fontWeight: "bold",
    textAlign: "center",
    // SignPainter- HouseScript
  },
  container: {
    justifyContent: "center",
    flex:1,
    backgroundColor: "white",
  },
  title: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
  },
  list: {
    marginTop: 20,
  },
  item: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: 1,
    alignItems: "center",
  },
  itemCount: {
    backgroundColor: "#252b33",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 7.5,
  },
  itemCountText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});


export default function RefinementList({ navigation }) {
  const [t, ontchanged] = React.useState()
  const items2 = [
    {
      key: "1",
      name: "Shark",
      
    },
    {
      key: "2",
      name: "Herring",
      
    },
    {
      key: "3",
      name: "Lion",
      
    },
    {
      key: "4",
      name: "Polar Bear",
      
    },
    {
      key: "5",
      name: "Penguin",
      
    },
    {
      key: "6",
      name: "Parrot",
      
    },
    {
      key: "7",
      name: "Parrot",
      
    },
    {
      key: "8",
      name: "Parrot",
      
    },
    {
      key: "9",
      name: "Parrot",
      
    },
  ]

  const ALGOLIA_ID = "2RC54JEYQ4";
  const ALGOLIA_ADMIN_KEY = "daf45e83f6667ed440637fe3e76528cb";
  const ALGOLIA_INDEX_NAME = "SearchCloth";

  const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

  const index = client.initIndex(ALGOLIA_INDEX_NAME);

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
  
  const dat = {
    "Title": "Batman T-Shirt",
    "Price": "17.99",
    "Location": "Miyapur",
    image: url
  } 

  function send_to_index() {
      index.saveObject({
    objectID: 2,
    ...dat,
  });
  ontchanged("Success")

  }



  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{t}</Text>

      <Button onPress={() => send_to_index()} title="Send to index"></Button>
    </View>
  );
};