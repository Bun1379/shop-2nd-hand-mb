import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CartFooter = ({ total, onCheckout }) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold">Tổng tiền:</Text>
        <Text className="text-lg font-semibold text-red-500">{total} VND</Text>
      </View>

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={() => onCheckout()}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Mua Ngay
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartFooter;
