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
    setListOrder(totalOrder.filter((order) => order.status === status));
  };

  const calculateTotalPrice = () => {
    return listOrder.reduce((total, order) => total + order.totalAmount, 0);
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
      {/* Order status bar */}
      <OrderStatusBar status={status} setStatus={setStatus} />

      {/* Tổng tiền */}
      <View className="border border-primary rounded-lg pb-2 mt-2 bg-white">
        <Text className="text-center mt-2 text-lg font-bold text-primary">
          Tổng tiền: {calculateTotalPrice().toLocaleString("vi-VN")} VNĐ
        </Text>
      </View>
      {/* Nếu không có đơn hàng */}
      {listOrder.length === 0 && (
        <Text className="text-center mt-4 text-primary">
          Không có đơn hàng nào
        </Text>
      )}

      {/* Danh sách đơn hàng */}
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
