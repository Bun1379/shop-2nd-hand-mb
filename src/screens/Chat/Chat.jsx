import { TouchableOpacity, View, Text, Linking, Alert } from "react-native";

const Chat = () => {
  const openMessenger = () => {
    const messengerURL = "https://m.me/nam.trieu.58760"; // Thay yourpageid bằng ID của trang bạn muốn
    Linking.canOpenURL(messengerURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(messengerURL);
        } else {
          Alert.alert("Không thể mở Messenger");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  return (
    <View className="h-20 w-full">
      <TouchableOpacity
        onPress={openMessenger}
        className="justify-center flex-1"
      >
        <Text>Chat with Messenger</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Chat;
