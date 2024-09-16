import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const ProductDetail = ({ route }) => {
    const { product } = route.params;  // Nhận dữ liệu từ navigation

    return (
        <ScrollView className="flex-1 p-4 bg-white">
            {/* Hình ảnh sản phẩm */}
            <Image
                source={{ uri: "https://th.bing.com/th/id/OIP.pRbr2XV7L1NEwYpS5noJEQHaHa?rs=1&pid=ImgDetMain" }}
                className="w-full h-64 rounded-lg mb-4"
                resizeMode="cover"
            />
            {/* Tên sản phẩm */}
            <Text className="text-2xl font-bold text-gray-800 mb-2">{product.productName}</Text>
            {/* Giá sản phẩm */}
            <Text className="text-xl text-red-500 font-semibold mb-4">{product.price} VND</Text>
            {/* Mô tả sản phẩm */}
            <Text className="text-base text-gray-600">{product.description}</Text>
        </ScrollView>
    );
};

export default ProductDetail;
