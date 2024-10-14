import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import { Icon } from "react-native-elements";

const ProductFooter = ({ onAddToCart, onBuyNow, onChatNow }) => {
  return (
    <View className="bottom-0 left-0 right-0 flex-row justify-around bg-white shadow-md border-t border-gray-300">
      <TouchableOpacity
        className="flex-[0.3] p-3 rounded-lg flex-col items-center justify-center"
        onPress={onChatNow}
      >
        <Icon name="commenting-o" type="font-awesome" size={31} color="black" />
        <Text className="text-center text-black">Chat ngay</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-[0.3] items-center justify-center flex-col pr-5"
        onPress={onAddToCart}
      >
        <Icon
          name="shopping-cart"
          type="font-awesome"
          size={31}
          color="black"
        />
        <Text className="text-center text-black">Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-[0.4] bg-primary items-center justify-center"
        onPress={onBuyNow}
      >
        <Text className="text-center text-white font-bold ">Mua ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductFooter;
