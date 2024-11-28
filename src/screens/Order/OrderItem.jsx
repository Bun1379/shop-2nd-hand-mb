import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Touchable, TouchableOpacity } from "react-native";

const OrderItem = ({ order }) => {
  const navigate = useNavigation();
  const handleClicked = () => {
    navigate.navigate("OrderDetail", { order: order });
  };
  return (
    <TouchableOpacity onPress={handleClicked}>
      <View className="border border-primary rounded-lg p-4 mb-2 bg-white">
        <Text className="text-lg font-bold text-gray-800">
          Mã đơn hàng: {order._id}
        </Text>

        <Text className="text-lg text-gray-600 mt-2">
          Tổng giá: {order.totalAmount.toLocaleString('vi-VN')} VND
        </Text>

        <Text className="text-md text-gray-600 mt-2">
          Địa chỉ: {order.address}
        </Text>

        <Text className="text-md text-gray-500 mt-2">
          Ngày tạo: {new Date(order.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;
