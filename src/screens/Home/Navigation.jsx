import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserScreen from "../User/UserScreen";
import Home from "./Home";
import Header from "../Component/Header";
import Chat from "../Chat/Chat";
import Notification from "../Notification/Notification";
import { View, Image } from "react-native";

function Navigation({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        setUserInfo(parsedUser);
      }
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu từ AsyncStorage:", error);
    }
  };

  useEffect(() => {
    const focusListener = navigation.addListener("focus", getUserData);
    return focusListener;
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconComponent;

          // Sử dụng icon từ FontAwesome
          if (route.name === "Home") {
            iconComponent = (
              <FontAwesome name="home" size={size} color={color} />
            );
          } else if (route.name === "Notifications") {
            iconComponent = (
              <FontAwesome name="bell" size={size} color={color} />
            );
          } else if (route.name === "Trang cá nhân") {
            iconComponent = (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri:
                      userInfo && userInfo.image
                        ? userInfo.image
                        : "https://via.placeholder.com/150",
                  }}
                  style={{
                    width: size * 1.5,
                    height: size * 1.5,
                    borderRadius: size,
                  }}
                />
              </View>
            );
          }

          return iconComponent;
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
      <Tab.Screen name="Notifications" component={Notification} />
      <Tab.Screen name="Trang cá nhân" component={UserScreen} />
    </Tab.Navigator>
  );
}

export default Navigation;
