import { FlatList, Text, View } from "react-native";
import NotificationAPI from "../../API/Notification";
import NotificationItem from "./NotificationItem";
import { useEffect, useState } from "react";

const Notification = () => {
  const [totalNotification, setTotalNotification] = useState([]);
  const fetchNotification = async () => {
    try {
      const response = await NotificationAPI.GetNotifications();
      const listNotification = response.data.DT;
      setTotalNotification(listNotification);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);
  return (
    <View className="p-2">
      <FlatList
        data={totalNotification}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
      />
    </View>
  );
};
export default Notification;
