import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';

const OrderStatusScreen = () => {
    const [activeTab, setActiveTab] = useState('Chờ xác nhận');

    const renderOrders = () => {
        // Dữ liệu giả cho đơn hàng
        const ordersData = {
            'Chờ xác nhận': [],
            'Đã xác nhận': [],
            'Đang giao hàng': [],
            'Đã giao': [],
            'Đã hủy': []
        };

        const orders = ordersData[activeTab];
        if (orders.length === 0) {
            return <Text className="text-center mt-4 text-primary">Không có đơn hàng {activeTab.toLowerCase()}</Text>;
        }

        return (
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id} // Đảm bảo rằng mỗi đơn hàng có id duy nhất
                renderItem={({ item }) => (
                    <View className="bg-white p-4 mb-2 rounded shadow">
                        <Text>{item.name}</Text>
                        {/* Thêm thông tin khác về đơn hàng ở đây */}
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        );
    };

    return (
        <View className="bg-gray-100 flex-1">
            {/* Thanh điều hướng trạng thái đơn hàng */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white p-4 max-h-20">
                {['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng', 'Đã giao', 'Đã hủy'].map((status) => (
                    <TouchableOpacity
                        key={status}
                        className={`py-2 px-4 ${activeTab === status ? 'border-b-2 border-primary' : ''}`}
                        onPress={() => setActiveTab(status)}
                    >
                        <Text className={activeTab === status ? 'text-primary font-bold' : 'text-gray-500'}>
                            {status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Danh sách đơn hàng */}
            <View className="flex-1 p-4">
                {renderOrders()}
            </View>
        </View>
    );
};

export default OrderStatusScreen;
