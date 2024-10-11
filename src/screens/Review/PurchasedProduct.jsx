import { useEffect, useState } from "react";
import OrderAPI from "../../API/OrderAPI";
import { FlatList, View } from "react-native";
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

  useEffect(() => {
    fetchDataProducts();
  }, []);
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <PurchasedProductItem product={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
      />
    </View>
  );
};

export default PurchasedProduct;
