import { FlatList, Text, View, TextInput, TouchableOpacity, Modal } from "react-native";
import CheckoutItem from "./CheckoutItem";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import CartFooter from "../Component/CartFooter";
import OrderAPI from "../../API/OrderAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Checkout = ({ route }) => {
  const navigation = useNavigation();
  const { items } = route.params;
  const [userInfo, setUserInfo] = useState({
    username: '',
    phone: '',
    address: '',
  });
  const [total, setTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false); // State để quản lý modal

  const fetchDataUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        setUserInfo(parsedUser);  // Update the entire userInfo object
      }
    } catch (error) {
      console.log('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
    }
  };

  const handleCheckout = async (selectedPaymentMethod, discountCode, totalDiscount) => {
    const data = {
      products: items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: totalDiscount,
      address: userInfo.address,
      phone: userInfo.phone,
      name: userInfo.username,
      discountCode: discountCode,
      paymentMethod: selectedPaymentMethod,
    };
    try {
      await OrderAPI.CreateOrder(data);
      alert("Mua hàng thành công");
      navigation.navigate("Order", { initStatus: "PENDING" });
    } catch (error) {
      console.log(error.response?.data || "API error");
      alert(error.response?.data?.EM);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  useEffect(() => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    setTotal(total);
  }, [items]);

  return (
    <View className="flex-1">
      <FlatList
        data={items}
        keyExtractor={(item) => item.product._id}
        renderItem={({ item }) => <CheckoutItem item={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListHeaderComponent={(
          <View className="h-40 bg-slate-200 p-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-bold">Thông tin người nhận: </Text>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Text className="text-blue-500">Thay đổi</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Tên: {userInfo.username}</Text>
              <Text>SĐT: {userInfo.phone}</Text>
              <Text>Địa chỉ: {userInfo.address}</Text>
            </View>
          </View>
        )}
      />

      <CartFooter total={total} onCheckout={handleCheckout} />

      {/* Modal form chỉnh sửa thông tin */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="w-4/5 bg-white p-6 rounded-lg">
            <Text className="text-lg font-bold mb-4">Chỉnh sửa thông tin người nhận</Text>

            <TextInput
              placeholder="Tên"
              value={userInfo.username}
              onChangeText={(text) => setUserInfo({ ...userInfo, username: text })}
              className="border border-gray-300 p-2 rounded-lg mb-3 bg-white"
            />
            <TextInput
              placeholder="Số điện thoại"
              value={userInfo.phone}
              onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
              className="border border-gray-300 p-2 rounded-lg mb-3 bg-white"
            />
            <TextInput
              placeholder="Địa chỉ"
              value={userInfo.address}
              onChangeText={(text) => setUserInfo({ ...userInfo, address: text })}
              className="border border-gray-300 p-2 rounded-lg mb-3 bg-white"
            />

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="bg-green-500 p-3 rounded-lg w-2/5"
              >
                <Text className="text-white text-center font-semibold">Lưu</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="bg-red-500 p-3 rounded-lg w-2/5"
              >
                <Text className="text-white text-center font-semibold">Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Checkout;
