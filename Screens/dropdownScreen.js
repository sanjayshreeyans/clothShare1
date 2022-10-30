import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  NavigatingContainer,
  ImageBackground,
} from "react-native";
// import { GoogleSpreadsheet } from "google-spreadsheet"
import { Picker } from "@react-native-picker/picker";

import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { initializeApp } from "firebase/app";
import react from "react";

import { AppLoading } from "expo";
import { getDatabase, ref, onValue, set, push } from "firebase/database";


export default function destinationPicker({ navigation }) {
  
  const [selectedLanguage, setSelectedLanguage] = React.useState();

  function validate_type_of_qr_code(qr_info) {
    // Converting the String type QR Code info to Array type.
    
    console.log(typeof qr_info, "QR Code Type");
    console.log(selectedLanguage, "Destination");
    console.log(qr_info, "QR Code Info");
    const replaceAll = require("string.prototype.replaceall");
    qr_info = replaceAll(qr_info, "[", "");
    qr_info = replaceAll(qr_info, "]", "");
    qr_info = replaceAll(qr_info, "'", "");
    qr_info = replaceAll(qr_info, " ", "");

    qr_info = qr_info.split(",");
    console.log(qr_info, "After split");

    // Converting the String type QR Code info to Array type. Complete.

    // User is a Teacher
    if (global.user_grade == "TEACHER") {
      // Run this code when the teacher scans the correct code.
      if (qr_info.length == 4) {
        signIn(qr_info);
      }

      // Run this code when the teacher scans the wrong code.
      else {
        console.log("Wrong code!!!!");
      }
    }
    // User is a Teacher. Complete

    // User is a Student
    else {
      // Run this code when the student scans the correct code.
      if (qr_info.length == 2) {
        console.log("signOut");
        signOut(qr_info);
      }

      // Run this code when the student scans the wrong code.
      else {
        console.log("Wrong code!!!!");
      }
    }
    // User is a Student. Complete.
  }

  const navigate = () => {
    navigation.navigate("Redirecter");
  };
  const spread = () => {
    
  };
  const onPress = () => {
    navigate();
    spread();
  };

  // Function to check the type of QRCode, Sign-in or Sign-out. Complete.

  // Function to sign-out a student from the classroom.
  function signOut(data) {
    if (global.new_user) {
    }

    // var time = String((today.getFullYear()) + "/" + (today.getMonth()+1) + "/" +
    // String(today.getDate()) + "/" +
    // String(today.getHours()) + ":" +
    // String(today.getMinutes()))
    else {
      

      console.log(data, "Informaiton about data");
      var today = new Date();
      var date2 =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate() +
        " " +
        today.getHours() +
        ":" +
        today.getMinutes();

      global.date =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate() +
        "/" +
        today.getHours() +
        ":" +
        today.getMinutes();
      console.log(date2, "Date 2");
      console.log(date, "Date 1");
      var info_dict = {
        "Student Name": global.user_name,
        "Room No at Check-Out": data[1],
        "Room No at Check-In": "",
        "Student Grade": global.user_grade,
        
        "Time Left": date,
        "Destination": String(selectedLanguage),
        "Email": global.user_email,
        "Row": "",
        "Completed full Cycle": false,
      };

      var info_dict3 = {
        "Student Name": global.user_name,
        "Room No at Check-Out": data[1],
        "Room No at Check-In": "",
        "Student Grade": global.user_grade,
        "Room No": data[1],
        "Time Left": date,
        Destination: String(selectedLanguage),
        Email: global.user_email,
        
        "Completed full Cycle": false,
      };

      var info_dict2 = {
        "Student Name": global.user_name,
        "Teacher Name": data[0],
        "Room No": data[1],
        "Time Left": date2,
        Destination: String(selectedLanguage),
        Email: global.user_email,
        "Completed full Cycle": false,
      };

      // const reference = ref(db, "users/" + userId);
      // set(reference, {
      //   highscore: score,
      // });

      // console.log(global.user_name, " you are sucessfully signed out", time);

      const db = getDatabase();
      const queue = ref(db, "/Queue/")
      const data_queue = 
          (global.user_grade +
          "/" +
          global.user_name +
          "/Signouts/" +
          global.date)
 
      global.signout_node = ref(
        db,
        global.user_grade + "/" + global.user_name + "/Signouts/" + global.date
      );
      const latest_val_node = ref(
        db,
        global.user_grade + "/" + global.user_name + "/Signouts/Latest_Val"
      );
      


        const SPREADSHEET_ID = "1ilh0SncMmPGsRxu_bJ6h7YG2isc7aFU-WSrxDUlQjyA";
        const SHEET_ID = "1936491392";
        const CLIENT_EMAIL = "pretty@iep1-337004.iam.gserviceaccount.com";
        const range = "A1";
        //const PRIVATE_KEY2 =
        // "-----BEGIN PRIVATE
        //KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDjsmPxc3alsRYC\nmi7JZOItSlVQ+h4+pcR86r7eLKfDvD8BXGIYc9EzRug6oz4K8uQC7EF9jM0CebQj\nVGIz6lBjKTazUawhWff95OBEyOaoEEYSAByb04izDcCjrJ1COtr7yWjhH067Z3Ti\nTzD3uI6nYIRr6DqDNPEfw16PdOvUCrv5Jj8Zu5ie3Mw8d5UYd881oJzlv68wKhxb\ne5RCIYI+op8p4t9OeB0o3I+lomSTHp9co5fpDonC4mUKXg+qgmDmky2p0o7s6dRg\nBt6mZVvo+45ohOnwWtSOU0mX3vK+/ljji54EizHtxbiRmxkEa3dPPzTTUgqReX5W\nRmvSzZdXAgMBAAECggEAFs+IxqgYE0pV16XlmQRzyjC/slCUVhdaQ19rBqv3lJrX\nvwWnyCZWJ2prmnA/J26k3AwaFX9VDHHv03hBLE1Fh2GaGsXMVj0CpJtYwltUDDMx\nKd18ADplX/a5PUxuJrPpuz62tJLj2s9m/MMNN0v0cp0vNvY5Ymqb22BBqWJ/u6q1\nNULNka9tYhEN4hhyTNw+q1qSIdCSLsaMmJpm16CSiUidfIsyofhNjSqoVng8Gk9Z\nGQCguy/KMYDZZLd0K4++fk0DJZtTg9UMPvNObTrVFFCVtVIQC8V4R4JYE8xLkwhr\nO3eW+/NDYSaxxm37nI18L9deTtnHo5Lj/p+ptNpRgQKBgQD8TnXI4uMfB+MZzMSs\nBx4k4JsL9DLUtNVJ60POWHK4JEuQwsbZxiU3/BrS2pdW06Up3CwA1ftyaNphEIuo\ng4Ks0qPd3uVeWIteJ5zdhbdLjKymeZRNtlHcIF+eAKmzuWq6v8uTNOvoOaDsSiji\n11pOlKtKH57NWuYEucPaM1rg1wKBgQDnB7QdN1VI46yrvlASDjqqcfuzq41cRYiC\nscNTlolK5ejp5nz3tBMzkZ7DAeHWLtstAKm+bKM/imsY82no242hjhh4LvX1SVi1\nHTIiU+Kr0JM38rEoDrH1XpWUdom1CW/kGF8cWxD+jO9I5Ee6gzIn/qe4ARNknrjE\nl4NQ+VetgQKBgCOByzOtMndgfcZYuejXy5c3ALrq7+hdVpLjiBRXADYH7ZZ+wstN\nBlndoczAtIGkoV7FvG+VraBJP0pfsLfTYiV+M097Gd5wKZTjkEDgm44HSxjWjVdu\nbBDFgY9T2o4PbwS/DyA1V2nECnCWczCRTAU5CO4Six+tRieuGPDxPz3bAoGAAmot\nMsT6Sjm++0iQ869cY52vYNBhON6tL5iGDyCarMK8bX1wPvKN5NMX0rf5UVDKD61b\nGNdv2WEr/2XD7KAm2dJvZQownfC3UaVNedhgnSUf9My/l0iYCZWEgLnAdLj1h2/N\nxrEY+2AjvCJOsZ9fbdWWkTDJsBqMmdlvkPAaP4ECgYBLLMg5E110Lh7vwMo4be9z\nMMzV4FTaKG7VH9mo1VGmB0Tuyu0nUNqQslHxHgSS4Gou0AAPs50ZTCwa+a8EV1It\n7IBvPn0lyg44WIZNoY73gK/jl+6unKap2VE2LrUN5EDl5ziYT7VBbg8OaumjqrRc\n0OtbowwdQEYvBhw9MHsJYw==\n-----END
        // PRIVATE KEY-----\n"

        const api_key = "AIzaSyDQVlXWEWSSuQ_BUhN3mfx7Cq6iYWt5w2I";
        const PRIVATE_KEY =
          "ya29.A0ARrdaM_C3_cU-s09qq6oNG4cdrnank0ZlGQrcFoG9zxcOagYcqLyIYB2Oa1w_dxbkrQIms7Acm5IZni64Z8GyrjLDRxCni4hgCeyjIvCntafYOWFKipbz6Nc9gtHC4AvjjTHjbCLJNJpbMXu8440SD7wjdS-zA";

        const appendEmptyRow = () => {
          fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}:batchUpdate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                //update this token with yours.
                Authorization: `Bearer ${PRIVATE_KEY}`,
              },
              body: JSON.stringify({
                requests: [
                  {
                    appendDimension: {
                      sheetId: SHEET_ID,
                      dimension: "ROWS",
                      length: 1,
                    },
                  },
                ],
              }),
            }
          );
        };

        appendEmptyRow();
        console.log("DONEAPPENDING");

        const GetRows = () => {
          fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                //update this token with yours.
                Authorization: `Bearer ${PRIVATE_KEY}`,
              },
            }
          )
            .then((response) => response.json())
            .then((data) =>
              printObject(
                info_dict3,
                data.sheets["0"].properties.gridProperties.rowCount
              )
            );
        };

        async function run() {
          await GetRows();
          console.log("HEKIO", info_dict);
          
        }
        run();  
        
        
        console.log(global.row_count, "From 19");

        // while loop that will run through an object and print the values

        const printObject = (obj, rowe) => {
          var colum = 1;
          var row = rowe + 1;
          Object.assign(info_dict, { Row: rowe + 1 });
          set(global.signout_node, info_dict);
          set(latest_val_node, info_dict2);
          console.log(info_dict, "DATA");
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              updateSheetValues(String(obj[key]), row, colum);
              colum++;
              console.log(colum, "colum");
              console.log(row, "row");
            }
          }
          console.log("The job finished successfully.");
        };

        const updateSheetValues = (value, row, colum) => {
          fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}:batchUpdate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                //update this token with yours.
                Authorization: `Bearer ${PRIVATE_KEY}`,
              },
              body: JSON.stringify({
                requests: [
                  {
                    repeatCell: {
                      range: {
                        startColumnIndex: colum - 1,
                        endColumnIndex: colum,
                        startRowIndex: row - 1,
                        endRowIndex: row,
                        sheetId: SHEET_ID,
                      },
                      cell: {
                        userEnteredValue: {
                          stringValue: value,
                        },
                      },
                      fields: "*",
                    },
                  },
                ],
              }),
            }
          );
        };




      

      const starCountRef = ref(db, "INFO");
        onValue(
          starCountRef,
          (snapshot) => {
            var data = snapshot.val();
            if (data["queue1"] == false) {
              console.log("I AM MESSING WITH THE VALUES");
              data["queue1"] = true;
              set(starCountRef, data);

              push(queue, data_queue);
              navigation.replace("Redirecter");
              return;
            } else {
              push(queue, data_queue);
              navigation.navigate("Redirecter");
              return;
            }
          },
          {
            onlyOnce: true,
          }
        );


      
     
      
       

      console.log("Switch has been made")
      // console.log("Done, check database for changes.");

      // const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

      // const appendSpreadsheet = async (row) => {
      //   try {
      //     await doc.useServiceAccountAuth({
      //       client_email: CLIENT_EMAIL,
      //       private_key: PRIVATE_KEY,
      //     });
      //     // loads document properties and worksheets
      //     await doc.loadInfo();

      //     const sheet = doc.sheetsById[SHEET_ID];
      //     const result = await sheet.addRow(row);
      //   } catch (e) {
      //     console.error("Error: ", e);
      //   }
      // };

      // const newRow = { "Student name:": global.user_name, "Teacher name:": data[0], "Classroom #:":data[1], "Grade:": global.user_grade, "Student email:": global.user_email, "Time Left:": String(date)};

      // appendSpreadsheet(newRow);


      // updateSheetValues();

      
    }
  }

  //  Function to sign-in a student

  function signIn(data) {
    // const db = getDatabase();
    // const reference = ref(db, "users/" + userId);
    // set(reference, {
    //   highscore: score,
    // });
  }
 
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Swiftoff</Text>
      <Text style={styles.paragraph3}>Once you click "Sign Out", {"\n"} you can now leave to your destination</Text>
      <Text style={styles.paragraph2}>Choose a destination:</Text>
      
      <Picker
        style={styles.input}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Choose a Destination: " value="unknown" />
        <Picker.Item label="Seminar" value="Seminar" />
        <Picker.Item label="Library" value="Library" />
        <Picker.Item label="Restroom" value="Restroom" />
        <Picker.Item label="Office" value="Office" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <TouchableOpacity
        title="Log In"
        color="purple"
        // validate_type_of_qr_code(global.info_qr)
        onPress={() => validate_type_of_qr_code(global.info_qr)}
        style={styles.roundButton1}
      >
       
        <Text style={styles.roundButton13}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "white",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 70,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    // SignPainter- HouseScript
    
  },
  paragraph2: {
    margin: 24,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  paragraph3: {
    margin: 4,
    fontSize: 35,
    justifyContent: "center",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: 400,
    justifyContent: "center",

    alignSelf: "center",
  },

  fixToText: {
    alignSelf: "center",
    width: 200,
    borderRadius: 15,
    paddingTop: 20,
  },

  roundButton1: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 25,

    backgroundColor: "purple",
  },

  roundButton2: {
    width: 200,
    height: 50,
    paddingTop: 0,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 0,
    borderRadius: 15,

    backgroundColor: "orange",
  },
  // SignPainter- HouseScript 98.0
  roundButton13: {
    fontSize: 20,
    color: "white",
    justifyContent: "center",
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

    alignSelf: "center",
  },
});
