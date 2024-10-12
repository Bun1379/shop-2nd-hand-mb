import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import AuthorAPI from "../../API/AuthorAPI";

const ChangePassword = ({ route, navigation }) => {
    const { userInfo } = route.params;
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await AuthorAPI.VerifyPassword({
                email: userInfo.email,
                password: password,
            });
            if (response.data.EM === "Password is correct") {
                alert("Mật khẩu chính xác, vui lòng đợi trong giây lát");
                const response = await AuthorAPI.SendOTP({
                    email: userInfo.email
                });
                if (response.data.EM === "OTP sent") {
                    navigation.navigate('ResetPW', { email: userInfo.email });
                }
            }
        }
        catch (error) {
            console.error("Lỗi: ", error);
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-[#F2F7FF] px-10">
            <View className="bg-white w-full p-6 rounded-xl shadow-md">
                <Text className="text-lg mb-2">Nhập mật khẩu của bạn</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3 mb-5 text-lg"
                    placeholder="Nhập mật khẩu"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />

                <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-green-700 p-4 rounded-lg"
                >
                    <Text className="text-white text-center text-lg">Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangePassword;
