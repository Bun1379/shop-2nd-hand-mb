import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import FavouriteItem from "./FavouriteItem";
import UserAPI from "../../API/UserAPI";

const Favourite = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const fetchDataFavorite = async () => {
    try {
      const response = await UserAPI.GetUserInfo();
      setProducts(response.data.DT.favourites);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm yêu thích:", error.message);
    }
  };

  const handleFavorite = async (productId) => {
    try {
      await UserAPI.PutUpdateFavorite(productId);
      fetchDataFavorite();
    } catch (error) {
      console.error("Lỗi:", error.message);
    }
  };

  const handleNavigate = (product) => {
    navigation.navigate("ProductDetail", { product });
  };

  useEffect(() => {
    fetchDataFavorite();
  }, []);
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <FavouriteItem
            product={item}
            handleFavorite={handleFavorite}
            handleNavigate={handleNavigate}
          />
        )}
      />
    </View>
  );
};

export default Favourite;
