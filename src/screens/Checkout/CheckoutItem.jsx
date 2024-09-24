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
              "https://th.bing.com/th?q=SK+Telecom+T1&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-US&cc=US&setlang=en&adlt=moderate&t=1&mw=247"
            }
            className="w-20 h-20 rounded-md mr-4"
          />
          <View className="flex-1">
            <Text className="text-lg font-semibold">
              {item.product.productName}
            </Text>
            <Text className="text-gray-600">Giá: {item.product.price} VND</Text>
            <Text className="text-gray-600">Số lượng: {item.quantity}</Text>
          </View>
        </View>

        <View className="border-t border-gray-200 pt-2">
          <Text className="text-right text-lg font-semibold">
            Tổng tiền: {item.price} VND
          </Text>
        </View>
      </View>
    </View>
  );
};
export default CheckoutItem;
