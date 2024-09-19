import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import UserAPI from "../../API/UserAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateUser = ({ route, navigation }) => {
    // Nhận dữ liệu người dùng từ route params
    const { userInfo } = route.params;

    const [formData, setFormData] = useState({
        username: userInfo.username || "",
        phone: userInfo.phone || "",
        gender: userInfo.gender || "",
        address: userInfo.address || "",
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
            if (token) {
                const response = await UserAPI.UpdateUser(
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                Alert.alert("Thông báo", response.data.EM);

                // Cập nhật dữ liệu người dùng trong AsyncStorage chỉ với các trường được cập nhật
                const existingUserData = await AsyncStorage.getItem("user");
                const updatedUser = {
                    ...JSON.parse(existingUserData),
                    ...formData, // Ghi đè các trường được cập nhật
                };
                await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

                // Sau khi cập nhật, điều hướng về trang trước
                navigation.goBack();
            }
        } catch (error) {
            console.log('Error updating user data:', error);
            Alert.alert("Error", "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    // Thêm listener cho sự kiện focus khi màn hình quay lại
    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            // Khi quay lại trang trước, trang đó sẽ được cập nhật thông tin
        });

        return () => {
            focusListener(); // Cleanup listener khi component unmount
        };
    }, [navigation]);

    return (
        <View className="flex-1 p-4 bg-gray-100">
            <Text className="text-2xl font-bold mb-4">Cập nhật thông tin</Text>

            <TextInput
                className="border border-gray-300 rounded-md p-3 mb-4"
                placeholder="Username"
                value={formData.username}
                onChangeText={(value) => handleInputChange("username", value)}
            />

            <TextInput
                className="border border-gray-300 rounded-md p-3 mb-4"
                placeholder="Phone"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
            />

            <TextInput
                className="border border-gray-300 rounded-md p-3 mb-4"
                placeholder="Gender (MALE, FEMALE, OTHER)"
                value={formData.gender}
                onChangeText={(value) => handleInputChange("gender", value)}
            />

            <TextInput
                className="border border-gray-300 rounded-md p-3 mb-4"
                placeholder="Address"
                value={formData.address}
                onChangeText={(value) => handleInputChange("address", value)}
            />

            <Button
                title={loading ? "Updating..." : "Update"}
                onPress={handleSubmit}
                disabled={loading}
            />
        </View>
    );
};

export default UpdateUser;
