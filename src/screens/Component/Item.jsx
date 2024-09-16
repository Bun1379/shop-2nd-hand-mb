import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Item = ({ product }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ProductDetail', { product });
  };
  return (
    <TouchableOpacity className="w-[47%] bg-white border border-gray-300 rounded-lg mb-5 shadow-md" onPress={handlePress}>
      {/* Hình ảnh sản phẩm */}
      <Image
        source={{ uri: "https://th.bing.com/th/id/OIP.pRbr2XV7L1NEwYpS5noJEQHaHa?rs=1&pid=ImgDetMain" }}
        className="w-full h-44 rounded-t-lg"
        resizeMode="cover"
      />
      <View className="p-3">
        {/* Tên sản phẩm */}
        <Text className="text-lg font-bold text-gray-800">{product.productName}</Text>
        {/* Giá sản phẩm */}
        <Text className="text-sm text-right text-gray-500 mt-1">{product.price} VND</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
