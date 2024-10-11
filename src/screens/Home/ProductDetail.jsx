import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductFooter from "../Component/ProductFooter";
import ModalAddProduct from "../Component/ModalAddProduct";
import CartAPI from "../../API/CartAPI";
import Reviews from "../Review/Reviews";
import ReviewAPI from "../../API/ReviewAPI";

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [reviews, setReviews] = useState([]);
  const [viewedProducts, setViewedProducts] = useState([]);

  const handleConfirm = async () => {
    console.log(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
    let rs = await CartAPI.UpdateQuantity({
      productId: product._id,
      quantity: parseInt(quantity),
    });
    if (rs.status === 200) {
      alert("Thêm vào giỏ hàng thành công");
    }
    setModalVisible(false); // Đóng modal sau khi xác nhận
  };

  const onAddToCart = () => {
    setModalVisible(true);
  };

  const onBuyNow = () => {
    console.log("Buy now");
  };

  const onChatNow = () => {
    console.log("Chat now");
  };

  const fetchDataReviews = async () => {
    try {
      const response = await ReviewAPI.GetReviewByProduct(product._id);
      const { data } = response;
      setReviews(data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu reviews:", error.message);
    }
  };

  const saveViewedProduct = async () => {
    try {
      const viewed = await AsyncStorage.getItem("viewedProducts");
      let viewedArray = viewed ? JSON.parse(viewed) : [];

      if (!viewedArray.some((item) => item._id === product._id)) {
        viewedArray.push(product);

        if (viewedArray.length > 10) {
          viewedArray.shift();
        }

        await AsyncStorage.setItem("viewedProducts", JSON.stringify(viewedArray));
      }

      setViewedProducts(viewedArray);
    } catch (error) {
      console.log("Lỗi khi lưu sản phẩm đã xem:", error);
    }
  };

  const fetchViewedProducts = async () => {
    try {
      const viewed = await AsyncStorage.getItem("viewedProducts");
      if (viewed) {
        setViewedProducts(JSON.parse(viewed));
      }
    } catch (error) {
      console.log("Lỗi khi lấy sản phẩm đã xem:", error);
    }
  };

  useEffect(() => {
    fetchDataReviews();
    saveViewedProduct();
    fetchViewedProducts();
  }, [product]);

  const renderViewedProduct = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { product: item })}>
      <View className="mr-4">
        <Image
          source={{ uri: item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150' }}
          className="w-32 h-32 rounded-lg"
          resizeMode="cover"
        />
        <Text
          className="text-center text-gray-800 mt-2"
          style={{ width: 128 }}
          numberOfLines={5}
          ellipsizeMode="tail"
        >
          {item.productName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView className="p-4 bg-white">
        {/* Phần nội dung sản phẩm */}
        <Image
          source={{
            uri: "https://th.bing.com/th/id/OIP.pRbr2XV7L1NEwYpS5noJEQHaHa?rs=1&pid=ImgDetMain",
          }}
          className="w-full h-64 rounded-lg mb-4"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          {product.productName}
        </Text>
        <Text className="text-xl text-red-500 font-semibold mb-4">
          {product.price} VND
        </Text>
        <Text className="text-base text-gray-600">{product.description}</Text>

        <View className="border-t-4 border-primary my-4"></View>

        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Đánh giá sản phẩm
        </Text>
        {reviews.length === 0 && (
          <Text className="text-base text-gray-600 mt-3">Chưa có đánh giá</Text>
        )}
        <Reviews reviews={reviews} />

        <View className="border-t-4 border-primary my-4"></View>

        {/* Mục Sản phẩm đã xem */}
        {viewedProducts.length > 0 && (
          <View className="mt-2 mb-4">
            <Text className="text-lg font-bold text-gray-800 mb-4">Sản phẩm đã xem</Text>
            <FlatList
              data={viewedProducts}
              renderItem={renderViewedProduct}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          </View>
        )}
      </ScrollView>
      <ProductFooter onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
      <ModalAddProduct
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        quantity={quantity}
        setQuantity={setQuantity}
        handleConfirm={handleConfirm}
        productImage={
          product.images && product.images.length > 0 ? product.images[0] : ""
        }
        productPrice={product.price}
      />
    </>
  );
};

export default ProductDetail;
