// import { createAppContainer} from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack'
// import LoginView from '../Screens/LoginScreen.js'
// // import SignupView from '../Screens/SignupScreen.js'
// import HomeView from '../Screens/HomeScreen.js'
// // import TeacherSignupView from '../Screens/TeacherSignupScreen.js';
// // import QRCodeView2 from '../Screens/QRCodeScreen.js';
// // import destinationPicker from '../Screens/dropdownScreen.js';
// // import QRCodeGenerator from '../Screens/QRCodeGenerator.js';
// // import SuccessfullySignedIn from '../Screens/SuccessfullySignedIn.js';
// // import Redirecter from '../Screens/Redirecter.js';
// // import SignIN from '../Screens/Sign_IN.js';

// const screens = {
//   Login: {
//     screen: LoginView,
//   },

  // HomeScreen: {
  //   screen: HomeView,

  //   defaultNavigationOptions: {
  //     headerStyle: {
  //       backgroundColor: "#006600",
  //     },
  //     headerTitleStyle: {
  //       fontWeight: "bold",
  //       color: "#FFF",
  //     },
  //     headerTintColor: "#FFF",
  //   }
  // },

//   // Signup: {
//   //   screen: SignupView,
//   // },a

//   // TeacherSignupScreen: {
//   //   screen: TeacherSignupView,
//   // },

//   // HomeScreen: {
//   //   screen: HomeView,
//   //   header: () => null,
//   // },

//   // QRCode: {
//   //   screen: QRCodeView2,
//   // },

//   // destinationPicker: {
//   //   screen: destinationPicker,
//   // },

//   // Redirecter: {
//   //   screen: Redirecter,
//   // },

//   // QRCodeGenerator: {
//   //   screen: QRCodeGenerator,
//   //   options: {
//   //     title: "Check Out",
//   //     header: () => null,
//   //   },
//   // },

//   // SuccessfullySignedIn: {
//   //   screen: SuccessfullySignedIn,
//   // },
//   // SignIn: {
//   //   screen: SignIN,
//   // },
// };

// const HomeStack = createStackNavigator(screens);

// const Navigator = createAppContainer(HomeStack)

// export default Navigator;

// ______________________

// import { createAppContainer } from "react-navigation";
// import "react-native-gesture-handler";
// import { createStackNavigator } from "react-navigation-stack";
// import LoginView from "../Screens/LoginScreen.js";
// import adScreen from "../Screens/postAnAdScreen.js";
// // import adScreen2 from "../Screens/postAnAdScreen2";
// // import adScreen3 from "../Screens/postAnAdScreen3";
// // import adScreen4 from "../Screens/postAnAdScreen4"
// import FlatListScreen from "../Screens/FlatListScreen.js";
// // import adScreen5 from "../Screens/postAnAdScreen5";
// import detailAdScreenBuyer from "../Screens/detailAdScreenBuyer.js"
// // import { AppRegistry, Platform } from 'react-native';

// const screens = {
//   FlatListScreen: {
//     screen: FlatListScreen,
//     headerMode: "none",
//     headerShown: false,
//   },

//   Login: {
//     screen: LoginView,
//   },

//   adScreen: {
//     screen: adScreen,
//   },

//   // adScreen2: {
//   //   screen: adScreen2,
//   // },

//   // adScreen3: {
//   //   screen: adScreen3,
//   //   header: () => null,
//   // },

//   // adScreen4: {
//   //   screen: adScreen4,
//   // },

//   // adScreen5: {
//   //   screen: adScreen5,
//   // },

//   detailScreen: {
//     screen: detailAdScreenBuyer,
//     headerMode: "none",
//     headerShown: false,

//       header: () => null,
//   },
// };

// const HomeStack = createStackNavigator(screens);

// const Navigator = createAppContainer(HomeStack);

// export default Navigator;