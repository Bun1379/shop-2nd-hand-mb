import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import OrderAPI from "../../API/OrderAPI";
import { FlatList, View, Text } from "react-native";
import PurchasedProductItem from "./PurchasedProductItem";

const PurchasedProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchDataProducts = async () => {
    try {
      const response = await OrderAPI.GetProductPurchased();
      const { data } = response;
      setProducts(data.DT);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDataProducts();
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {products.length === 0 ? (
        <Text style={{ fontSize: 16, color: "gray" }}>
          Bạn không còn sản phẩm chưa đánh giá.
        </Text>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => <PurchasedProductItem product={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
        />
      )}
    </View>
  );
};

export default PurchasedProduct;
