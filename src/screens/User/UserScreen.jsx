import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserPage = () => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({ username: '', email: '', gender: '', address: '', phone: '' });

    const getUserData = async () => {
        try {
            const user = await AsyncStorage.getItem("user");
            if (user !== null) {
                const parsedUser = JSON.parse(user);
                setUserInfo(parsedUser);  // Update the entire userInfo object
            }
        } catch (error) {
            console.log('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
        }
    };
    getUserData();
    return (
        <ScrollView className="bg-gray-100">
            {/* Thông tin người dùng */}
            <View className="bg-white p-4 flex-row items-center">
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }} // Thay bằng ảnh người dùng thực tế
                    className="w-16 h-16 rounded-full"
                />
                <View className="ml-4">
                    <Text className="text-lg font-bold">{userInfo.username}</Text>
                </View>
            </View>


            {/* Cài đặt tài khoản */}
            <View className="mt-4 bg-white">
                <TouchableOpacity className="p-4 border-b border-gray-200"
                    onPress={() => navigation.navigate('Đơn hàng của tôi')}>
                    <Text className="text-base text-primary" >Đơn hàng của tôi</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-4 border-b border-gray-200">
                    <Text className="text-base text-primary">Cài đặt tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-4 border-b border-gray-200">
                    <Text className="text-base text-primary">Trung tâm hỗ trợ</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-4">
                    <Text className="text-base text-primary">Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default UserPage;
