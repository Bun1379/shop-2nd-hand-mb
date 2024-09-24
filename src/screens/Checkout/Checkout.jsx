import { FlatList, Text, View } from "react-native";
import CheckoutItem from "./CheckoutItem";
import { useEffect, useState } from "react";
import UserAPI from "../../API/UserAPI";
import CartFooter from "../Component/CartFooter";
import OrderAPI from "../../API/OrderAPI";

const Checkout = ({ route }) => {
  const { items } = route.params;
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(0);
  const fetchDataUser = async () => {
    try {
      const res = await UserAPI.GetUserInfo();
      setAddress(res.data.DT.address);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    const data = {
      products: items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: total,
      address: address,
      paymentMethod: "COD",
    };
    try {
      await OrderAPI.CreateOrder(data);
      alert("Mua hàng thành công");
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
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View className="h-40 bg-slate-200 p-4">
        <Text className="text-xl font-bold">Địa chỉ nhận hàng: </Text>
        <Text> {address}</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.product._id}
        renderItem={({ item }) => <CheckoutItem item={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <CartFooter total={total} onCheckout={handleCheckout} />
    </View>
  );
};
export default Checkout;
