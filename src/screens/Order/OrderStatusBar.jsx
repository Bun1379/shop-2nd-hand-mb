import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

const OrderStatusBar = ({ status, setStatus }) => {
  const statusList = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      className="p-1 bg-white"
    >
      {statusList.map((item) => (
        <TouchableOpacity
          key={item}
          className={`px-4 py-2 mx-2 ${
            status === item ? "border-b-2 border-green-500" : ""
          }`}
          onPress={() => setStatus(item)}
        >
          <Text
            className={`${
              status === item ? "text-green-500" : "text-black"
            } text-lg`}
          >
            {item === "PENDING"
              ? "Đang xử lý"
              : item === "CONFIRMED"
              ? "Đã xác nhận"
              : item === "SHIPPED"
              ? "Đã vận chuyển"
              : item === "DELIVERED"
              ? "Đã giao hàng"
              : "Đã hủy"}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default OrderStatusBar;
