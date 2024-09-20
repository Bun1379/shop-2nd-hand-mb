import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import CheckBox from "expo-checkbox";
import CartAPI from "../../API/CartAPI";

const CartItem = ({ productId, productName, initialQuantity }) => {
  console.log("product name: ", productId, productName, initialQuantity);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isChecked, setIsChecked] = useState(false);

  const incrementQuantity = async () => {
    try {
      await CartAPI.UpdateQuantity({
        productId: productId,
        quantity: parseInt(quantity) + 1,
      });
      setQuantity((prev) => parseInt(prev) + 1);
    } catch (error) {
      console.log(error.response.data); // Log the error response from the API
    }
  };

  const decrementQuantity = async () => {
    try {
      await CartAPI.UpdateQuantity({
        productId: productId,
        quantity: parseInt(quantity) - 1,
      });
      setQuantity((prev) => parseInt(prev) - 1);
    } catch (error) {
      console.log(error.response.data); // Log the error response from the API
    }
  };

  return (
    <View className="px-2  my-1">
      <View className="flex-row items-center p-4 bg-white border-b border-gray-200 rounded-lg drop-shadow-lg">
        {/* Checkbox */}
        <CheckBox
          value={isChecked}
          disabled={false}
          onValueChange={(newValue) => setIsChecked(newValue)}
          className="mr-4"
        />

        {/* Hình ảnh sản phẩm */}
        <Image
          source={{
            uri: "https://th.bing.com/th/id/OIP.pRbr2XV7L1NEwYpS5noJEQHaHa?rs=1&pid=ImgDetMain",
          }}
          className="w-24 h-24 rounded-lg"
          resizeMode="cover"
        />

        {/* Thông tin sản phẩm */}
        <View className="flex-1 ml-4">
          <Text className="text-lg font-semibold">{productName}</Text>
          <View className="flex-row items-center mt-2">
            {/* Nút giảm số lượng */}
            <TouchableOpacity
              onPress={decrementQuantity}
              disabled={quantity <= 1}
              className="p-2 border border-gray-300 rounded"
            >
              <Text className="text-lg">-</Text>
            </TouchableOpacity>

            {/* Ô hiển thị và chỉnh sửa số lượng */}
            <TextInput
              className="border border-gray-300 rounded mx-2 text-center w-12"
              keyboardType="numeric"
              value={quantity.toString()}
              onChangeText={setQuantity}
            />

            {/* Nút tăng số lượng */}
            <TouchableOpacity
              onPress={incrementQuantity}
              className="p-2 border border-gray-300 rounded"
            >
              <Text className="text-lg">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
