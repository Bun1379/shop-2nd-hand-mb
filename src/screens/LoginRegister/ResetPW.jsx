import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AuthorAPI from '../../API/AuthorAPI';

function ResetPW({ navigation, route }) {
    const { email } = route.params; // Lấy giá trị email từ route.params
    const [otp, setOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleForgotPW = async () => {
        if (!otp || !newPassword) {
            Alert.alert('Lỗi', 'OTP và mật khẩu không được để trống.');
            return;
        }
        try {
            const response = await AuthorAPI.ResetPW({ // Sử dụng endpoint API
                email,
                otp,
                newPassword
            });
            Alert.alert('Reset mật khẩu thành công!');
            navigation.navigate('Login'); // Chuyển đến màn hình Login
        } catch (error) {
            Alert.alert('Lỗi', error.response.data.EM || 'Đã xảy ra lỗi');
            console.error(error); // Log lỗi để giúp gỡ lỗi dễ hơn
        }
    };

    return (
        <View className="flex-1 justify-center p-5">
            <Text className="text-2xl mb-5 text-center">Reset mật khẩu</Text>
            <TextInput
                className="h-10 border border-gray-400 mb-5 px-2"
                placeholder="Tên đăng nhập"
                value={email} // Hiển thị email đã được truyền qua route.params
                editable={false} // Ngăn chỉnh sửa email
            />
            <TextInput
                className="h-10 border border-gray-400 mb-5 px-2"
                placeholder="OTP"
                value={otp}
                onChangeText={setOTP}
            />
            <TextInput
                className="h-10 border border-gray-400 mb-5 px-2"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
            <TouchableOpacity className="bg-blue-500 p-3 rounded mb-3" onPress={handleForgotPW}>
                <Text className="text-white text-center">Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ResetPW;
