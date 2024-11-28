import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CheckoutItem = ({ item }) => {
  return (
    <View className="p-2">
      <View className="bg-white p-4 rounded-lg shadow">
        <View className="flex-row mb-4">
          <Image
            src={
              item.product.images.length > 0
                ? item.product.images[0]
                : "https://via.placeholder.com/150"
            }
            className="w-20 h-20 rounded-md mr-4"
          />
          <View className="flex-1">
            <Text className="text-lg font-semibold">
              {item.product.productName}
            </Text>
            <Text className="text-gray-600">Giá: {item.product.price.toLocaleString('vi-VN')} VND</Text>
            <Text className="text-gray-600">Số lượng: {item.quantity}</Text>
          </View>
        </View>

        <View className="border-t border-gray-200 pt-2">
          <Text className="text-right text-lg font-semibold">
            Tổng tiền: {item.price.toLocaleString('vi-VN')} VND
          </Text>
        </View>
      </View>
    </View>
  );
};
export default CheckoutItem;
