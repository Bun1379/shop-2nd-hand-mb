import React from "react";
import { View, Text } from "react-native";

const OrderItem = ({ order }) => {
  return (
    <View className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
      <Text className="text-lg font-bold text-gray-800">
        Mã đơn hàng: {order._id}
      </Text>

      <Text className="text-lg text-gray-600 mt-2">
        Tổng giá: {order.totalAmount} VND
      </Text>

      <Text className="text-md text-gray-600 mt-2">
        Địa chỉ: {order.address}
      </Text>

      <Text className="text-md text-gray-500 mt-2">
        Ngày tạo: {new Date(order.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default OrderItem;
