import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AuthorAPI from '../../API/AuthorAPI';
function VerifyUser({ navigation, route }) {
    const [otp, setOtp] = useState('');
    const { email } = route.params;
    const handleConfirmOtp = async () => {
        try {
            const response = await AuthorAPI.VerifiedUser({
                email,
                otp
            });
            alert(response.data.EM);
            navigation.navigate("Login");
        } catch (error) {
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi xác thực OTP.');
            console.log('Error:', error);
        }
    };
    return (
        <View className="flex-1 justify-center items-center bg-[#F2F7FF] p-5">
            <Text className="text-2xl font-bold mb-6">Nhập mã OTP</Text>

            <TextInput
                className="w-full h-12 border border-gray-300 rounded-lg p-3 text-lg mb-4"
                placeholder="Nhập mã OTP"
                maxLength={6}  // OTP thường là 6 ký tự
                value={otp}
                onChangeText={setOtp}
            />

            <TouchableOpacity className="w-full bg-blue-500 py-3 rounded-lg items-center mb-4" onPress={handleConfirmOtp}>
                <Text className="text-white text-lg">Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
}
export default VerifyUser;
