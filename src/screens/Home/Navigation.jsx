import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import FontAwesome from "react-native-vector-icons/FontAwesome";

import UserScreen from "../User/UserScreen";
import Home from "./Home";
import Header from "../Component/Header";

function Navigation({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Sử dụng icon từ FontAwesome
          if (route.name === "Home") {
            iconName = "home";
            // } else if (route.name === 'Notifications') {
            //     iconName = 'bell';
          } else if (route.name === "Trang cá nhân") {
            iconName = "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Header navigation={navigation} />,
          headerTitleContainerStyle: {
            width: "100%",
          },
        }}
      />
      {/* <Tab.Screen name="Notifications" component={Notifications} /> */}
      <Tab.Screen name="Trang cá nhân" component={UserScreen} />
    </Tab.Navigator>
  );
}

export default Navigation;
