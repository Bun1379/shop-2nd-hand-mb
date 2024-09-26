import { FlatList, Text, View } from "react-native";
import OrderStatusBar from "./OrderStatusBar";
import OrderAPI from "../../API/OrderAPI";
import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

const Order = ({ route }) => {
  const { initStatus } = route.params;
  const [listOrder, setListOrder] = useState([]);
  const [status, setStatus] = useState(initStatus);
  const fetchDataOrder = async () => {
    try {
      const response = await OrderAPI.GetOrders();
      const listOrder = response.data.DT;
      setListOrder(listOrder.filter((order) => order.status === status));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchDataOrder();
  }, [status]);
  return (
    <View>
      <OrderStatusBar status={status} setStatus={setStatus} />
      {listOrder.length === 0 && <Text>Không có đơn hàng nào</Text>}
      <FlatList
        data={listOrder}
        renderItem={({ item }) => <OrderItem order={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
      />
    </View>
  );
};
export default Order;
