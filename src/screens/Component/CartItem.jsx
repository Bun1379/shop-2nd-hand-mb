import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import CheckBox from "expo-checkbox";
import CartAPI from "../../API/CartAPI";

const CartItem = React.memo(
  ({
    productId,
    productName,
    initialQuantity,
    price,
    image,
    selected,
    onCheckbox,
    handleUpdateCart,
    maxQuantity,
  }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [isChecked, setIsChecked] = useState(selected);
    const [totalPrice, setTotalPrice] = useState(price * initialQuantity);
    const handleCheckbox = () => {
      setIsChecked(!isChecked);
      onCheckbox(productId);
    };
    const updateQuantity = async (newQuantity) => {
      try {
        await CartAPI.UpdateQuantity({
          productId: productId,
          quantity: newQuantity,
        });
        setQuantity(newQuantity);
        handleUpdateCart(productId, newQuantity);
      } catch (error) {
        console.log(error.response?.data || "API error");
      }
    };

    const handleQuantityChange = (newQuantity) => {
      const validQuantity = Math.max(1, newQuantity);
      if (maxQuantity && validQuantity > maxQuantity) {
        alert(`Số lượng tối đa là ${maxQuantity}`);
        return;
      }
      updateQuantity(validQuantity);
    };

    useEffect(() => {
      setTotalPrice(price * quantity);
    }, [quantity]);

    return (
      <View className="px-2  my-1">
        <View className="flex-row items-center p-4 bg-white border-b border-gray-200 rounded-lg drop-shadow-lg">
          <CheckBox
            value={isChecked}
            disabled={false}
            onValueChange={handleCheckbox}
            className="mr-4"
          />
          <Image
            source={{
              uri: image,
            }}
            className="w-24 h-24 rounded-lg"
            resizeMode="cover"
          />
          <Text className="text-lg font-semibold ml-4">{totalPrice.toLocaleString('vi-VN')} VND</Text>

          <View className="flex-1 ml-4">
            <Text className="text-lg font-semibold">{productName}</Text>
            <View className="flex-row items-center mt-2">
              <TouchableOpacity
                onPress={() => handleQuantityChange(parseInt(quantity) - 1)}
                disabled={quantity <= 1}
                className="p-2 border border-gray-300 rounded"
              >
                <Text className="text-lg">-</Text>
              </TouchableOpacity>

              <TextInput
                className="border border-gray-300 rounded mx-2 text-center w-12"
                keyboardType="numeric"
                value={quantity.toString()}
                onChangeText={(value) => {
                  const newQuantity = parseInt(value);
                  if (
                    !isNaN(newQuantity) &&
                    newQuantity >= 1 &&
                    newQuantity <= maxQuantity
                  ) {
                    setQuantity(newQuantity);
                  } else {
                    setQuantity(1);
                  }
                }}
                onBlur={() => handleQuantityChange(parseInt(quantity))}
              />

              <TouchableOpacity
                onPress={() => handleQuantityChange(parseInt(quantity) + 1)}
                className="p-2 border border-gray-300 rounded"
              >
                <Text className="text-lg">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
);

export default CartItem;
