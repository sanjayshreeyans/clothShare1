import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, NavigatingContainer, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from "react-native-elements";
import { SearchBar } from "react-native-elements";
import { Image } from "react-native";
import { Card, ListItem,  Icon } from "react-native-elements";
import { getDownloadURL, getStorage } from "firebase/storage";
import { ref as refS } from "firebase/storage";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

export default function HomeView({ navigation })  {
      const [url, setUrl] = React.useState();
      var cou = 0
      const didMount = React.useRef(false);

      

      React.useEffect(() => {
        const func = async () => {
          const storage = getStorage();
          const reference = refS(storage, "/image_sample.png");
          await getDownloadURL(reference).then((x) => {
            setUrl(x);
          });
          
          
        };
        func();
      }, [])
      
      console.log(url, (cou++))
     

      
      


     const [search, updateSearch] = React.useState();
      console.log(search)
      


    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('test')
          if(value !== null) {
            console.log('value from home: ', value);
          }
        } catch(e) {
          // error reading value
        }
      }
      getData()


    

      

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

    return (
      <View style={styles.container}>
        <Header
          elevated={true}
          // containerStyle={styles.container}
          leftComponent={<Text style={styles.paragraph}>ClothShare</Text>}
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
              onChangeText={updateSearch}
              value={search}
            />
          }
          rightComponent={{ icon: "home", color: "#fff" }}
        />

        <View style={styles.containerCardMaster}>
          <View style={styles.containerCard}>
            <Image
              style={styles.image}
              resizeMode="fit"
              source={{ uri: url }}
            />
            <Text style={styles.paragraphCard}> Sanjay </Text>
            );
          </View>

        
        </View>

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
    // justifyContent: "top",
    // alignSelf: "top",
  },
  containerCard: {
    width: "98%",
    height: "100%",
    padding: 0,
    borderWidth: 1,
    
  },
  containerCardMaster: {
    paddingLeft: "20%",
    paddingTop: "2%"
    
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
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: 400,

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
    width: 200,
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
    alignItems: "left",
    alignSelf: "left",
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
  