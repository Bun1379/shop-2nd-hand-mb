import React from "react";
import { View, Text, FlatList } from "react-native";
import Item from "../Component/Item";

const products = [
  {
    id: "1",
    name: "Sản phẩm 1",
    price: "100.000 VND",
  },
  { id: "2", name: "Sản phẩm 2", price: "200.000 VND" },
  { id: "3", name: "Sản phẩm 3", price: "300.000 VND" },
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
      key={`numColumns-2`}
      data={products}
      renderItem={({ item }) => {
        return (
          <Item
            imageUrl={
              "https://th.bing.com/th/id/OIP.pRbr2XV7L1NEwYpS5noJEQHaHa?rs=1&pid=ImgDetMain"
            }
            name={item.name}
            price={item.price}
          />
        );
      }}
      numColumns={2}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{ padding: 10, flexGrow: 1 }}
    />
  );
};

export default Home;
