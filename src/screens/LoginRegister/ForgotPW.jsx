import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AuthorAPI from '../../API/AuthorAPI';

function ForgotPW({ navigation }) {
    const [email, setEmail] = useState('');

    const handleForgotPW = async () => {
        if (!email) {
            Alert.alert('Lỗi', 'Xin vui lòng nhập email của bạn.');
            return;
        }
        try {
            const response = await AuthorAPI.SendOTP({ // Sử dụng endpoint API
                email
            });
            navigation.navigate('ResetPW', { email }); // Chuyển đến màn hình resetPW
        } catch (error) {
            Alert.alert('Lỗi', error.response.data.EM || 'Đã xảy ra lỗi');
        }
    };

    return (
        <View className="flex-1 justify-center p-5">
            <Text className="text-2xl mb-5 text-center">Nhập email mà bạn đã đăng ký</Text>
            <TextInput
                className="h-10 border border-gray-400 mb-5 px-2"
                placeholder="Tên đăng nhập"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity className="bg-blue-500 p-3 rounded mb-3" onPress={handleForgotPW}>
                <Text className="text-white text-center">Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-500 p-3 rounded" onPress={() => navigation.navigate('Login')}>
                <Text className="text-white text-center">Back</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ForgotPW;
