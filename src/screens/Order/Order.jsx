import { FlatList, Text, View } from "react-native";
import OrderStatusBar from "./OrderStatusBar";
import OrderAPI from "../../API/OrderAPI";
import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

const Order = ({ route }) => {
  const { initStatus } = route.params;

  const [listOrder, setListOrder] = useState([]);
  const [status, setStatus] = useState(initStatus);
  const [totalOrder, setTotalOrder] = useState([]);

  const fetchDataOrder = async () => {
    try {
      const response = await OrderAPI.GetOrders();
      const listOrder = response.data.DT;
      setTotalOrder(listOrder);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filterOrder = () => {
    console.log("Filter order");
    setListOrder(totalOrder.filter((order) => order.status === status));
  };

  useEffect(() => {
    fetchDataOrder();
  }, []);

  useEffect(() => {
    if (totalOrder.length > 0) {
      filterOrder();
    }
  }, [status, totalOrder]);

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
