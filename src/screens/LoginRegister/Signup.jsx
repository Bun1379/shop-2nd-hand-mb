import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AuthorAPI from '../../API/AuthorAPI';

function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        if (!email || !password) {
            Alert.alert('Lỗi', 'Xin vui lòng nhập đầy đủ thông tin.');
            return;
        }
        try {
            const response = await AuthorAPI.Signup({
                email,
                password,
            });
            if (response.data.EM === "Create user successfully") {
                Alert.alert('Đăng ký thành công!');
                await AuthorAPI.SendOTP({
                    email,
                });
                navigation.navigate('VerifyUser', { email });
            } else {
                Alert.alert('Đăng ký thất bại', response.data.message);
            }
        } catch (error) {
            Alert.alert('Lỗi', error.message || 'Đã xảy ra lỗi');
        }
    };

    return (
        <View className="flex-1 justify-center p-5">
            <Text className="text-2xl mb-5 text-center">Đăng ký</Text>
            <TextInput
                className="h-10 border border-gray-400 mb-5 px-2"
                placeholder="Tên đăng nhập"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                className="h-10 border border-gray-400 mb-5 px-2"
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity className="bg-blue-500 p-3 rounded mb-3" onPress={handleSignup}>
                <Text className="text-white text-center">Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-500 p-3 rounded" onPress={() => navigation.navigate('Login')}>
                <Text className="text-white text-center">Back</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Signup;
