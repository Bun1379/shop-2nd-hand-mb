import { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

function UserProfile({ navigation }) {
    const [userInfo, setUserInfo] = useState({ username: '', email: '', gender: '', address: '', phone: '' });

    // Sử dụng useEffect với dependency array để gọi khi component mount
    useEffect(() => {
        const getUserData = async () => {
            try {
                const user = await AsyncStorage.getItem("user");
                if (user !== null) {
                    const parsedUser = JSON.parse(user);
                    const { username, email, gender, address, phone } = parsedUser;
                    setUserInfo({ username, email, gender, address, phone });
                }
            } catch (error) {
                console.log('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
            }
        };

        getUserData();
    }, []); // Chỉ chạy khi component mount

    // Mảng lưu chi tiết người dùng để hiển thị qua map
    const userDetails = [
        { label: "Tên", value: userInfo.username },
        { label: "Email", value: userInfo.email },
        { label: "Giới tính", value: userInfo.gender },
        { label: "Điện thoại", value: userInfo.phone },
        { label: "Địa chỉ", value: userInfo.address }
    ];

    return (
        <View className="flex-1 justify-center items-center bg-[#F2F7FF] px-10">
            <View className="justify-center items-center p-5 w-40 h-40 bg-white shadow-lg rounded-full mb-6">
                <Image
                    source={require('../../../assets/edit.jpg')}
                    style={{ width: 160, height: 160, borderRadius: 80 }}
                />
            </View>
            <View className="bg-white w-full p-6 rounded-xl shadow-md">
                <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Thông tin cá nhân
                </Text>
                <View className="space-y-3">
                    {userDetails.map((detail, index) => (
                        <View key={index} className="flex-row justify-between">
                            <Text className="text-lg font-medium text-gray-600">{detail.label}:</Text>
                            <Text className="text-lg text-gray-800">{detail.value}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default UserProfile;
