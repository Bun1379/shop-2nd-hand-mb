import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Item from "../Component/Item";
import ProductAPI from "../../API/ProductAPI";

const Search = ({ navigation, route }) => {
  const { searchQuery } = route.params;
  const [arrayProducts, setArrayProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    fetchDataProducts();
  }, [sortOrder]);

  const fetchDataProducts = async () => {
    try {
      const response = await ProductAPI.GetProducts({
        search: searchQuery,
        sortOrder,
      });
      const { data } = response;
      setArrayProducts(data.DT);
    } catch (error) {
      console.error("Chi tiết lỗi:", error.message);
    }
  };
  const handleButtonPrice = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortOrder("asc");
    }
  };

  const handleButtonNew = () => {
    setSortOrder(null);
  };

  return (
    <View>
      <View className="flex-row justify-around bg-gray-100 rounded-lg shadow-md w-full">
        <TouchableOpacity
          onPress={() => handleButtonNew()}
          className="p-3 bg-white shadow-sm hover:shadow-lg w-6/12 justify-center items-center border-r"
        >
          <Text className="text-lg font-semibold text-gray-700 ">Mới</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleButtonPrice()}
          className="p-3 bg-white shadow-sm hover:shadow-lg w-6/12 justify-center items-center"
        >
          <Text className="text-lg font-semibold text-gray-700">Giá cả</Text>
        </TouchableOpacity>
      </View>
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

export default Search;
