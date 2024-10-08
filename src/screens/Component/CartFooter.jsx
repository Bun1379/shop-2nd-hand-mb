import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DiscountAPI from "../../API/DiscountAPI";

const CartFooter = ({ total, onCheckout }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
    const [discountCode, setDiscountCode] = useState();
    const [discount, setDiscount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(total);
    const CheckDiscountCode = async (code) => {
        try {
            const rs = await DiscountAPI.getDiscountByCode(code);
            setDiscountCode(rs.data.DT._id);
            setDiscount(rs.data.DT.discountPercentage);
            setTotalDiscount(total - (total * rs.data.DT.discountPercentage / 100));
        } catch (error) {
            alert(error.response?.data?.EM);
        }
    }
    return (
        <View className="bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
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
                <Text className="text-lg font-semibold">Nhập mã giảm giá:</Text>
                <View className="border border-gray-200 rounded-lg">
                    <TextInput
                        placeholder="Nhập mã giảm giá"
                        className="p-2 w-40"
                        onEndEditing={(e) => CheckDiscountCode(e.nativeEvent.text)}
                    />
                </View>
            </View>
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold">Tổng cộng:</Text>
                <Text className="text-lg font-semibold text-red-500">{total} VND</Text>
            </View>
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold">Giảm giá:</Text>
                <Text className="text-lg font-semibold">({discount}%) -{(total * discount / 100)} VND</Text>
            </View>
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold">Tổng thanh toán:</Text>
                <Text className="text-lg font-semibold text-red-500">{totalDiscount} VND</Text>
            </View>
            <TouchableOpacity
                className="bg-blue-500 p-4 rounded-lg"
                onPress={() => onCheckout(selectedPaymentMethod, discountCode, totalDiscount)}
            >
                <Text className="text-white text-center text-lg font-semibold">
                    Mua Ngay
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CartFooter;
