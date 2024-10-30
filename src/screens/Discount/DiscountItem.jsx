import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DiscountItem = ({ discount }) => {
  const [isUsed, setIsUsed] = useState(false);
  useEffect(() => {
    const checkDiscountUsage = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData !== null) {
          const user = JSON.parse(userData);
          setIsUsed(discount.usersUsed.includes(user._id));
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    checkDiscountUsage();
  }, []);

  return (
    <View className="w-full bg-white rounded-lg p-4 my-1 shadow-md">
      <View className="flex items-start">
        <Text className="text-lg font-bold">{discount.discountCode}</Text>
        <Text className="text-base text-gray-600">
          Discount percentage: {discount.discountPercentage}%
        </Text>
        {discount.expiredDate && (
          <Text className="text-base text-gray-600">
            Expired date: {new Date(discount.expiredDate).toLocaleDateString()}
          </Text>
        )}
        <Text
          className={
            isUsed
              ? "text-base text-red-600 font-semibold"
              : "text-base text-green-600 font-semibold"
          }
        >
          {isUsed ? "Đã sử dụng" : "Chưa sử dụng"}
        </Text>
      </View>
    </View>
  );
};

export default DiscountItem;
