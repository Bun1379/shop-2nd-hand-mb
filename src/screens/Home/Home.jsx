import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import Item from "../Component/Item";
import ProductAPI from "../../API/ProductAPI";

const Home = () => {
  const [arrayProducts, setArrayProducts] = useState([]);

  useEffect(() => {
    fetchDataProducts();
  }, []);
  const fetchDataProducts = async () => {
    try {
      const response = await ProductAPI.GetProducts();
      const { data } = response;
      setArrayProducts(data.DT);
    } catch (error) {
      console.error("Chi tiết lỗi:", error.message);
    }
  };
  return (
    <View>
      {arrayProducts && arrayProducts.length > 0 && (
        <FlatList
          key={`numColumns-2`}
          data={arrayProducts}
          renderItem={({ item }) => {
            return (
              <Item
                product={item}
              />
            );
          }}
          numColumns={2}
          keyExtractor={(item) => item._id + ""}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ padding: 10, flexGrow: 1 }}
        />
      )}
    </View>
  );
};

export default Home;
