import { StyleSheet } from "react-native";
import React from "react";
import UserProfile from "./src/screens/User/UserProfile";
import Login from "./src/screens/LoginRegister/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./src/screens/LoginRegister/Signup";
import ForgotPW from "./src/screens/LoginRegister/ForgotPW";
import ResetPW from "./src/screens/LoginRegister/ResetPW";
import VerifyUser from "./src/screens/LoginRegister/VerifyUser";
import Navigation from "./src/screens/Home/Navigation";
import Search from "./src/screens/Home/Search";
import ProductDetail from "./src/screens/Home/ProductDetail";
import UpdateUser from "./src/screens/User/UpdateUser";
import Header from "./src/screens/Component/Header";
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPW" component={ForgotPW} />
        <Stack.Screen name="ResetPW" component={ResetPW} />
        <Stack.Screen name="VerifyUser" component={VerifyUser} />
        <Stack.Screen
          name="Navigation"
          component={Navigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            header: () => <Header />,
            headerTitleContainerStyle: {
              width: "100%",
            },
          }}
        />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="UpdateUser" component={UpdateUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
