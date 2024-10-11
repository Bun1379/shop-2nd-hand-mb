import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import FontAwesome from "react-native-vector-icons/FontAwesome";

import UserScreen from "../User/UserScreen";
import Home from "./Home";
import Header from "../Component/Header";
import Chat from "../Chat/Chat";
import Notification from "../Notification/Notification";

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
          } else if (route.name === "Chat") {
            iconName = "comments";
          } else if (route.name === "Trang cá nhân") {
            iconName = "user";
          } else if (route.name === "Notifications") {
            iconName = "bell";
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
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Notifications" component={Notification} />
      <Tab.Screen name="Trang cá nhân" component={UserScreen} />
    </Tab.Navigator>
  );
}

export default Navigation;
