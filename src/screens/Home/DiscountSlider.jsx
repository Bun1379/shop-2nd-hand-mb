import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ToastAndroid } from "react-native";
import DiscountAPI from "../../API/DiscountAPI";
import UserAPI from "../../API/UserAPI";

const DiscountSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const [userDiscounts, setUserDiscounts] = useState([]);
  const itemsPerPage = 3;

  // Tính toán nhóm giảm giá
  const groupedDiscounts = useMemo(() => {
    const groups = [];
    for (let i = 0; i < discounts.length; i += itemsPerPage) {
      groups.push(discounts.slice(i, i + itemsPerPage));
    }
    return groups;
  }, [discounts]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedDiscounts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? groupedDiscounts.length - 1 : prevIndex - 1
    );
  };

  const fetchDataDiscounts = async () => {
    try {
      const response = await DiscountAPI.getAllValidDiscount();
      setDiscounts(response.data.DT);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const fetchUserDiscounts = async () => {
    try {
      const response = await UserAPI.GetUserInfo();
      setUserDiscounts(response.data.DT.discounts);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleReceiveDiscount = async (discountCode) => {
    try {
      const response = await UserAPI.PutUpdateDiscount(discountCode);
      ToastAndroid.show(response.data.EM, ToastAndroid.SHORT);
      fetchUserDiscounts();
    } catch (error) {
      Alert.alert("Error", error.response.data.EM);
    }
  };

  useEffect(() => {
    fetchDataDiscounts();
    fetchUserDiscounts();
  }, []);

  const renderDiscount = ({ item }) => (
    <View className="w-24 mx-2 p-3 bg-gray-100 rounded-lg border border-gray-300">
      <Text className="text-lg font-bold">Mã: {item.discountCode}</Text>
      <Text className="text-base my-2">Giảm: {item.discountPercentage}%</Text>
      {userDiscounts.find((userDiscount) => userDiscount._id === item._id) ? (
        <Text className="text-red-500 text-base font-bold">Đã nhận</Text>
      ) : (
        <Button
          title="Lưu"
          onPress={() => handleReceiveDiscount(item._id)}
          color="#28a745"
        />
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-white mb-5">
      <Text className="text-2xl text-center mb-4">Discounts</Text>
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={handlePrev}>
          <Text className="text-2xl px-2 text-blue-500">{"<"}</Text>
        </TouchableOpacity>
        <FlatList
          data={groupedDiscounts[currentIndex]}
          renderItem={renderDiscount}
          keyExtractor={(item) => item._id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity onPress={handleNext}>
          <Text className="text-2xl px-2 text-blue-500">{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

};

export default DiscountSlider;
