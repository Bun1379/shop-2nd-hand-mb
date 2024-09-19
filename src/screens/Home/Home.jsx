import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import Item from "../Component/Item";
import ProductAPI from "../../API/ProductAPI";

const Home = () => {
  const [arrayProducts, setArrayProducts] = useState([]);
  const [page, setPage] = useState(1); // Quản lý trang hiện tại
  const [loading, setLoading] = useState(false); // Quản lý trạng thái tải

  useEffect(() => {
    fetchDataProducts();
  }, [page]);

  const fetchDataProducts = async () => {
    if (loading) return; // Không tải nếu đang trong trạng thái tải

    setLoading(true);
    try {
      const response = await ProductAPI.GetProducts({ page }); // Truyền page vào API
      const { data } = response;

      // Cập nhật sản phẩm, giữ lại các sản phẩm đã tải trước đó
      setArrayProducts((prevProducts) => [...prevProducts, ...data.DT.products]);
    } catch (error) {
      console.error("Chi tiết lỗi:", error.message);
    }
    setLoading(false);
  };

  // Hàm tải thêm dữ liệu khi kéo đến cuối danh sách
  const loadMoreProducts = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View>
      {arrayProducts && arrayProducts.length > 0 ? (
        <FlatList
          key={`numColumns-2`}
          data={arrayProducts}
          renderItem={({ item }) => (
            <Item product={item} />
          )}
          numColumns={2}
          keyExtractor={(item) => item._id + ""}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ padding: 10, flexGrow: 1 }}
          onEndReached={loadMoreProducts} // Kích hoạt khi kéo tới cuối danh sách
          onEndReachedThreshold={0.5} // Ngưỡng kích hoạt (0.5 là khi còn 50% đến cuối)
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          } // Hiển thị loading ở cuối danh sách
        />
      ) : (
        <Text>Không có sản phẩm nào để hiển thị</Text>
      )}
    </View>
  );
};

export default Home;
