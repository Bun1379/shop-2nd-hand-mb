import { Text, View } from "react-native";

const NotificationItem = ({ notification }) => {
  return (
    <View className="border border-primary rounded-lg p-4 mb-2 bg-white">
      <Text className="text-lg font-bold text-gray-800">
        Mã đơn hàng: {notification.order}
      </Text>

      <Text className="text-lg text-gray-600 mt-2">{notification.message}</Text>

      <Text className="text-md text-gray-500 mt-2">
        Ngày tạo: {new Date(notification.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default NotificationItem;
