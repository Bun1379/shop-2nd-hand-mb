import { FlatList, Text, View, TextInput, TouchableOpacity, Modal } from "react-native";
import CheckoutItem from "./CheckoutItem";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import CartFooter from "../Component/CartFooter";
import OrderAPI from "../../API/OrderAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddressAPI from "../../API/AddressAPI";

const Checkout = ({ route }) => {
  const navigation = useNavigation();
  const { items } = route.params;
  const [userInfo, setUserInfo] = useState({
    username: '',
    phone: '',
    address: '',
  });
  const [total, setTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]); // State để lưu danh sách địa chỉ
  const [selectedAddress, setSelectedAddress] = useState(null); // State để lưu địa chỉ đang chọn

  const fetchDataUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        setUserInfo(parsedUser);
        setSelectedAddress(parsedUser.address); // Cập nhật địa chỉ mặc định
      }
    } catch (error) {
      console.log('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await AddressAPI.GetAddressByUser();
      if (response.status === 200) {
        const addresses = response.data.DT;
        setAddresses(addresses);
        const defaultAddress = addresses.find(
          (address) => address.isDefault === true
        );
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      }
    } catch (error) {
      alert("Lỗi: " + error.response.data.EM);
    }
  };

  const handleCheckout = async (selectedPaymentMethod, discountCode, totalDiscount) => {
    const data = {
      products: items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: totalDiscount,
      address: `${selectedAddress.address}, ${selectedAddress.district}, ${selectedAddress.ward}, ${selectedAddress.city}`,
      phone: selectedAddress.phone,
      name: selectedAddress.name,
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
    fetchAddresses(); // Lấy danh sách địa chỉ
  }, []);

  useEffect(() => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    setTotal(total);
  }, [items]);

  const renderAddress = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedAddress(item);
        setIsModalVisible(false);
      }}
      className="p-4 border-b border-gray-200 bg-white border border-primary rounded-lg"
    >
      {item.isDefault && (
        <Text className="absolute top-5 right-5 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
          Mặc định
        </Text>
      )}
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text className="text-gray-700 mt-1">Số điện thoại: {item.phone}</Text>
      <Text className="text-gray-700">
        Địa chỉ: {item.address}, {item.district}, {item.ward}, {item.city}
      </Text>
    </TouchableOpacity>
  );

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
            {selectedAddress && (
              <View>
                <Text>Tên: {selectedAddress.name}</Text>
                <Text>SĐT: {selectedAddress.phone} </Text>
                <Text>Địa chỉ: {selectedAddress.address},{" "}
                  {selectedAddress.district}, {selectedAddress.ward},{" "}
                  {selectedAddress.city} </Text>
              </View>
            )}
          </View>
        )}
      />

      <CartFooter total={total} onCheckout={handleCheckout} />

      {/* Modal chọn địa chỉ */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-4/5 bg-white p-6 rounded-lg">
            <Text className="text-lg font-bold mb-4">Chọn địa chỉ giao hàng</Text>
            <FlatList
              data={addresses}
              keyExtractor={(item) => item._id}
              renderItem={renderAddress}
            />

            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="bg-red-500 p-3 rounded-lg mt-4"
            >
              <Text className="text-white text-center font-semibold">Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Checkout;
