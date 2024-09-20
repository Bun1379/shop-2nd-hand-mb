import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Pressable,
} from "react-native";

const ModalAddProduct = ({
  modalVisible,
  setModalVisible,
  quantity,
  setQuantity,
  handleConfirm,
  productImage,
  productPrice,
}) => {
  const incrementQuantity = () => {
    setQuantity((prev) => {
      const newValue = parseInt(prev) + 1;
      return newValue.toString();
    });
  };
  const decrementQuantity = () => {
    setQuantity((prev) => {
      const newValue = parseInt(prev) - 1;
      return newValue.toString();
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
        <View className="flex-1 justify-end">
          <Pressable
            onPress={() => {}} // Chặn sự kiện nhấn trên modal
          >
            <View className="bg-white p-5 rounded-t-lg shadow-lg border border-gray-300">
              <View className="flex-row items-center justify-between">
                {/* Ảnh sản phẩm */}
                <Image
                  source={{ uri: productImage }}
                  className="w-20 h-20 rounded-md"
                  resizeMode="cover"
                />
                <View className="ml-4 flex-1">
                  {/* Giá sản phẩm */}
                  <Text className="text-xl font-bold text-gray-800">
                    {productPrice} VND
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <TouchableOpacity
                      onPress={decrementQuantity}
                      className="p-2 border border-gray-300 rounded"
                      disabled={quantity === "1"}
                    >
                      <Text className="text-lg">-</Text>
                    </TouchableOpacity>
                    <TextInput
                      className="border border-gray-300 rounded mx-2 text-center w-16"
                      keyboardType="numeric"
                      value={quantity}
                      onChangeText={setQuantity}
                    />
                    <TouchableOpacity
                      onPress={incrementQuantity}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <Text className="text-lg">+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Dấu x để đóng modal */}
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="absolute top-0 right-0"
                >
                  <Text className="text-4xl font-bold">×</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="bg-green-500 rounded mt-4 h-10 items-center justify-center"
                onPress={handleConfirm}
              >
                <Text className="text-white text-center">Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalAddProduct;
