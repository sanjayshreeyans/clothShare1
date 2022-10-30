import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import LoginView from "../Screens/LoginScreen.js";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  NavigatingContainer,
  ImageBackground,
} from "react-native";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
export default function QRCodeView2({ navigation }) {
  // If platform is web.
  global.keep_scanning =true
  if (Platform.OS == "web") {
    const [data, setData] = React.useState("Not Found");

    // Function to check the type of QRCode, Sign-in or Sign-out.
    function switchToDropdown(qr_info) {
      if (global.keep_scanning) {
        global.info_qr = qr_info;
        console.log(typeof qr_info, "QR Code Type");
        console.log(qr_info, "QR Code Info");
        const replaceAll = require("string.prototype.replaceall");
        qr_info = qr_info.replaceAll("[", "");
        qr_info = qr_info.replaceAll("]", "");
        qr_info = qr_info.replaceAll("'", "");
        qr_info = qr_info.replaceAll(" ", "");

        qr_info = qr_info.split(",");
        console.log(qr_info, "After split");

        // Converting the String type QR Code info to Array type. Complete.

        // User is a Teacher
        if (global.user_grade == "TEACHER") {
          global.keep_scanning = true;
          // Run this code when the teacher scans the correct code.
          if (qr_info.length == 4) {
            var today = new Date();
            var date2 =
              today.getFullYear() +
              "/" +
              (today.getMonth() + 1) +
              "/" +
              today.getDate() +
              " " +
              (today.getHours() + 1) +
              ":" +
              (today.getMinutes() + 1);

            var date =
              today.getFullYear() +
              "/" +
              (today.getMonth() + 1) +
              "/" +
              today.getDate() +
              "/" +
              (today.getHours() + 1) +
              ":" +
              (today.getMinutes() + 1);
            console.log(date2, "Date 2");
            console.log(date, "Date 1");

            const db = getDatabase();
            const starCountRef = ref(
              db,
              global.user_grade +
                "/" +
                global.user_name +
                "/Signouts/" +
                qr_info[3]
            );
            onValue(starCountRef, (snapshot) => {
              const data = snapshot.val();
              data["Completed full Cycle"] = true;
              data["Time Returned"] = date2;
              
              const send_ref = ref(
                db,
                global.user_grade +
                  "/" +
                  global.user_name +
                  "/Signouts/" +
                  qr_info[3]
              );
              set(send_ref, data);
            });
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
            const db = getDatabase();
            const authorized_code = ref(db, "Authorized Codes")
            onValue(authorized_code, (snapshot) => {

              const data = snapshot.val();
              var a = []
              const d = Object.values(data)
              console.log(d, "Data");
              console.log(Number(qr_info[0], "1"))
              if (d.includes(Number(qr_info[0]))) {
              console.log(data, "Data");
              console.log("signOut");
              navigation.navigate("destinationPicker");
              global.keep_scanning = false;
              }
              else{
                console.log("Wrong code!!!!");
              }
            })
            
          }

          // Run this code when the student scans the wrong code.
          else {
            console.log("Wrong code!!!!");
          }
        }
      }
    } 


    return (
      <ImageBackground
      source={require("../Scan.png")}
      resizeMode="cover"
      style={styles.image}>
 <View style={styles.input}>
        <Text style={styles.paragraph}>Swiftoff</Text>
        <BarcodeScannerComponent
          style={styles.paragraph}
          width={1500}
          height={640}
          onUpdate={(err, result) => {
            if (result) switchToDropdown(result.text);
            else setData("Not Found");
          }}
        />
        <p>{data}</p>
      </View>
      </ImageBackground>
    );
  }

  // If platform is anything other than web.
  else {
    global.proceed = true;
    console.log("inside of else statement to load camera");

    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);

    React.useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }, []);

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : switchToDropdown}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    );

    function switchToDropdown(qr_info) {
      if (qr_info != undefined) {
        global.info_qr = qr_info.data;
        qr_info = qr_info.data;
        console.log(typeof qr_info, "QR Code Type foo");
        console.log(qr_info, "QR Code Info foot");
        const replaceAll = require("string.prototype.replaceall");
        qr_info = replaceAll(qr_info, "[", "");
        qr_info = replaceAll(qr_info, "]", "");
        qr_info = replaceAll(qr_info, "'", "");
        

        qr_info = qr_info.split(",");
        console.log(qr_info, "After split");

        // Converting the String type QR Code info to Array type. Complete.

        // User is a Teacher
        if (global.user_grade == "TEACHER") {
          // Run this code when the teacher scans the correct code.
          if (qr_info.length == 4) {
             
          var today = new Date();
          var date2 =
            today.getFullYear() +
            "/" +
            (today.getMonth() + 1) +
            "/" +
            today.getDate() +
            " " +
            (today.getHours()) +
            ":" +
            (today.getMinutes());

          var date =
            today.getFullYear() +
            "/" +
            (today.getMonth() + 1) +
            "/" +
            today.getDate() +
            "/" +
            (today.getHours()) +
            ":" +
            (today.getMinutes());
          console.log(date2, "Date 2");
          console.log(date, "Date 1");
          
          const db = getDatabase();
          const starCountRef = ref(db, (qr_info[0])+"/"+(qr_info[1])+"/"+ (qr_info[2]) + "/"  + (qr_info[3]));
          console.log(starCountRef, "Infot ref")
          onValue(starCountRef, (snapshot) => {
          var data = snapshot.val();
          console.log(data,": Data")
          data["Completed full Cycle"] = true;
          data["Time Returned"] =  date2;
          var count_row = data["Row"]
          var data_sheet = {"Completed full Cycle":"true", "Time Returned": date2}
          console.log(global.user_name, ": Here is the name");
          data["Teacher at Check-In"] = global.user_name;
          var data_sheet2 = {
            "Teacher at Check-In": global.user_name
          };
            
          const infoReft = ref(db, "INFO");
          onValue(infoReft, (snapshot) => {
            var data2 = snapshot.val();
            if (data2["queue2"] == false) {
              data2["queue2"] = true;
              set(infoReft, data2);

              
              if (global.proceed == true) {
                console.log("SPINNNN");
                const send_ref = ref(
                  db,
                  qr_info[0] +
                    "/" +
                    qr_info[1] +
                    "/" +
                    qr_info[2] +
                    "/" +
                    qr_info[3]
                );

                const path =
                  qr_info[0] +
                  "/" +
                  qr_info[1] +
                  "/" +
                  qr_info[2] +
                  "/" +
                  qr_info[3];
                const queue2 = ref(db, "Queue2");
                global.proceed = false;
                set(send_ref, data);
                push(queue2, path);
                
                navigation.navigate("SuccessfullySignedIn");
                return;
              }
              return;
            }

            else {
              
              if (global.proceed == true) {
                console.log("SPINNNN")
                const send_ref = ref(
                  db,
                  qr_info[0] +
                    "/" +
                    qr_info[1] +
                    "/" +
                    qr_info[2] +
                    "/" +
                    qr_info[3]
                );

                const path =
                  qr_info[0] +
                  "/" +
                  qr_info[1] +
                  "/" +
                  qr_info[2] +
                  "/" +
                  qr_info[3];
                const queue2 = ref(db, "Queue2");
                global.proceed = false;




                   const SPREADSHEET_ID =
                     "1ilh0SncMmPGsRxu_bJ6h7YG2isc7aFU-WSrxDUlQjyA";
                   const SHEET_ID = "1936491392";
                   const CLIENT_EMAIL =
                     "pretty@iep1-337004.iam.gserviceaccount.com";
                   const range = "A1";
                   //const PRIVATE_KEY2 =
                   // "-----BEGIN PRIVATE
                   //KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDjsmPxc3alsRYC\nmi7JZOItSlVQ+h4+pcR86r7eLKfDvD8BXGIYc9EzRug6oz4K8uQC7EF9jM0CebQj\nVGIz6lBjKTazUawhWff95OBEyOaoEEYSAByb04izDcCjrJ1COtr7yWjhH067Z3Ti\nTzD3uI6nYIRr6DqDNPEfw16PdOvUCrv5Jj8Zu5ie3Mw8d5UYd881oJzlv68wKhxb\ne5RCIYI+op8p4t9OeB0o3I+lomSTHp9co5fpDonC4mUKXg+qgmDmky2p0o7s6dRg\nBt6mZVvo+45ohOnwWtSOU0mX3vK+/ljji54EizHtxbiRmxkEa3dPPzTTUgqReX5W\nRmvSzZdXAgMBAAECggEAFs+IxqgYE0pV16XlmQRzyjC/slCUVhdaQ19rBqv3lJrX\nvwWnyCZWJ2prmnA/J26k3AwaFX9VDHHv03hBLE1Fh2GaGsXMVj0CpJtYwltUDDMx\nKd18ADplX/a5PUxuJrPpuz62tJLj2s9m/MMNN0v0cp0vNvY5Ymqb22BBqWJ/u6q1\nNULNka9tYhEN4hhyTNw+q1qSIdCSLsaMmJpm16CSiUidfIsyofhNjSqoVng8Gk9Z\nGQCguy/KMYDZZLd0K4++fk0DJZtTg9UMPvNObTrVFFCVtVIQC8V4R4JYE8xLkwhr\nO3eW+/NDYSaxxm37nI18L9deTtnHo5Lj/p+ptNpRgQKBgQD8TnXI4uMfB+MZzMSs\nBx4k4JsL9DLUtNVJ60POWHK4JEuQwsbZxiU3/BrS2pdW06Up3CwA1ftyaNphEIuo\ng4Ks0qPd3uVeWIteJ5zdhbdLjKymeZRNtlHcIF+eAKmzuWq6v8uTNOvoOaDsSiji\n11pOlKtKH57NWuYEucPaM1rg1wKBgQDnB7QdN1VI46yrvlASDjqqcfuzq41cRYiC\nscNTlolK5ejp5nz3tBMzkZ7DAeHWLtstAKm+bKM/imsY82no242hjhh4LvX1SVi1\nHTIiU+Kr0JM38rEoDrH1XpWUdom1CW/kGF8cWxD+jO9I5Ee6gzIn/qe4ARNknrjE\nl4NQ+VetgQKBgCOByzOtMndgfcZYuejXy5c3ALrq7+hdVpLjiBRXADYH7ZZ+wstN\nBlndoczAtIGkoV7FvG+VraBJP0pfsLfTYiV+M097Gd5wKZTjkEDgm44HSxjWjVdu\nbBDFgY9T2o4PbwS/DyA1V2nECnCWczCRTAU5CO4Six+tRieuGPDxPz3bAoGAAmot\nMsT6Sjm++0iQ869cY52vYNBhON6tL5iGDyCarMK8bX1wPvKN5NMX0rf5UVDKD61b\nGNdv2WEr/2XD7KAm2dJvZQownfC3UaVNedhgnSUf9My/l0iYCZWEgLnAdLj1h2/N\nxrEY+2AjvCJOsZ9fbdWWkTDJsBqMmdlvkPAaP4ECgYBLLMg5E110Lh7vwMo4be9z\nMMzV4FTaKG7VH9mo1VGmB0Tuyu0nUNqQslHxHgSS4Gou0AAPs50ZTCwa+a8EV1It\n7IBvPn0lyg44WIZNoY73gK/jl+6unKap2VE2LrUN5EDl5ziYT7VBbg8OaumjqrRc\n0OtbowwdQEYvBhw9MHsJYw==\n-----END
                   // PRIVATE KEY-----\n"

                   const api_key = "AIzaSyDQVlXWEWSSuQ_BUhN3mfx7Cq6iYWt5w2I";
                   const PRIVATE_KEY =
                     "ya29.A0ARrdaM9Bdr8LasGVYImS-v31BVY78c43d7xHEuIutBK6u6g9DhIDlPfA4Ny1rVVKV-oZdttBDVF8GoAobyCWNT0OuM_r8nfMxIg0dtuL0RyWOq4lizgrAgeTDvH2gUzmYq4YzVZHBgVkT7x8ONk5Z0_2WFpn";

                  

                  
                  const printObject = (obj) => {
                    var colum =  9;
                    var row = count_row;
                    
                    set(send_ref, data);
                    push(queue2, path);
                    
                    for (var key in obj) {
                      if (obj.hasOwnProperty(key)) {
                        updateSheetValues(String(obj[key]), row, colum);
                        colum=10;
                        console.log(colum, "colum");
                        console.log(row, "row");
                      }
                    }
                    console.log("The job finished successfully.");
                  };


                  const printObject2 = (obj, col) => {
                    var colum = col;
                    var row = count_row;

                    

                    for (var key in obj) {
                      if (obj.hasOwnProperty(key)) {
                        updateSheetValues(String(obj[key]), row, colum);
                        
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




                  async function run() {
                    await printObject(data_sheet);
                    await printObject2(data_sheet2, 3);
                    
                  }
                  run();  






                
                navigation.navigate("SuccessfullySignedIn");
                return
              }
              return 
              
            }

          }, {
            onlyOnce: true,
          });





          return
          })}
          // Run this code when the teacher scans the wrong code.
          else {
            console.log("Wrong code!!!!");
          }

          
        // User is a Teacher. Complete

        // User is a Student
        
      
    }

    else {
          // Run this code when the student scans the correct code.
          if (qr_info.length == 2) {
            console.log("signOut");
            navigation.replace("destinationPicker");
          }

          // Run this code when the student scans the wrong code.
          else {
            console.log("Wrong code!!!!");
          }
        }


    

  }}}}
  


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
    // SignPainter- HouseScript
    color: "white",
  },
  input: {
    height: 0,
    width: 200,
    margin: 0,
    padding: 10,

    alignItems: "center",
    alignSelf: "center",
    paddingBottom: 800,
  },

  fixToText: {
    alignSelf: "center",
    width: 200,
    borderRadius: 15,
    paddingTop: 20,
  },

  roundButton1: {
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 15,

    backgroundColor: "purple",
  },

  roundButton2: {
    width: 200,
    height: 40,
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
  },
  roundButton14: {
    fontSize: 20,
    color: "white",
  },
  image: {
    flex: 1,
    justifyContent: "center",
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
  }
});