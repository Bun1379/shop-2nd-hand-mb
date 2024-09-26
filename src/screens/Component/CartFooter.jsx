import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CartFooter = ({ total, onCheckout }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();

    return (
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold">Phương thức thanh toán:</Text>
                <View className="border border-gray-200 rounded-lg">
                    <Picker
                        selectedValue={selectedPaymentMethod}
                        onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
                        style={{ height: 50, width: 150 }}
                    >
                        <Picker.Item label="Tiền mặt" value="COD" />
                    </Picker>
                </View>
            </View>

            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold">Tổng tiền:</Text>
                <Text className="text-lg font-semibold text-red-500">{total} VND</Text>
            </View>

            <TouchableOpacity
                className="bg-blue-500 p-4 rounded-lg"
                onPress={() => onCheckout(selectedPaymentMethod)}
            >
                <Text className="text-white text-center text-lg font-semibold">
                    Mua Ngay
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CartFooter;
