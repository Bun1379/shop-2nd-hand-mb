import React from 'react';
import { View, Text, FlatList } from 'react-native';

const products = [
    { id: '1', name: 'Sản phẩm 1', price: '100.000 VND' },
    { id: '2', name: 'Sản phẩm 2', price: '200.000 VND' },
    { id: '3', name: 'Sản phẩm 3', price: '300.000 VND' },
];

const Home = () => {
    const renderItem = ({ item }) => (
        <View className="p-4 border border-gray-300 rounded-lg mb-4">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-base text-gray-500">{item.price}</Text>
        </View>
    );

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 10 }}
        />
    );
};

export default Home;
