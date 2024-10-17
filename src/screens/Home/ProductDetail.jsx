import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductFooter from "../Component/ProductFooter";
import ModalAddProduct from "../Component/ModalAddProduct";
import CartAPI from "../../API/CartAPI";
import Reviews from "../Review/Reviews";
import ReviewAPI from "../../API/ReviewAPI";
import ProductAPI from "../../API/ProductAPI";
import { Icon } from "react-native-elements";
import UserAPI from "../../API/UserAPI";
import Swiper from "react-native-swiper";

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [reviews, setReviews] = useState([]);
  const [viewedProducts, setViewedProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [favoriteText, setFavoriteText] = useState("Yêu thích");

  const handleConfirm = async () => {
    try {
      let rs = await CartAPI.UpdateQuantity({
        productId: product._id,
        quantity: parseInt(quantity),
      });
      if (rs.status === 200) {
        alert("Thêm vào giỏ hàng thành công");
      }
      setModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error.message);
    }
  };

  const onAddToCart = () => {
    setModalVisible(true);
  };

  const onBuyNow = () => {
    console.log("Mua ngay");
  };
  const fetchDataReviews = async () => {
    try {
      const response = await ReviewAPI.GetReviewByProduct(product._id);
      setReviews(response.data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu reviews:", error.message);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const response = await ProductAPI.GetProducts({
        page: 1,
        category: product.category._id,
      });
      const similar = response.data.DT.products;

      // Lọc bỏ sản phẩm hiện tại ra khỏi danh sách sản phẩm tương tự
      const filteredSimilar = similar.filter(
        (item) => item._id !== product._id
      );

      setSimilarProducts(filteredSimilar);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm tương tự:", error);
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

        await AsyncStorage.setItem(
          "viewedProducts",
          JSON.stringify(viewedArray)
        );
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

  const renderFavorite = async () => {
    const existingUserData = await UserAPI.GetUserInfo();
    const favoriteProducts = existingUserData.data.DT.favourites;
    if (favoriteProducts.some((item) => item._id === product._id)) {
      setFavoriteText("Đã yêu thích");
    }
  };

  const handleFavorite = async () => {
    try {
      await UserAPI.PutUpdateFavorite(product._id);
      if (favoriteText === "Yêu thích") {
        setFavoriteText("Đã yêu thích");
      } else {
        setFavoriteText("Yêu thích");
      }
    } catch (error) {
      console.error("Lỗi:", error.message);
    }
  };

  useEffect(() => {
    fetchDataReviews();
    fetchSimilarProducts(); // Gọi API sản phẩm tương tự
    saveViewedProduct();
    fetchViewedProducts();
    renderFavorite();
  }, [product]);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <View className="mr-4">
        <Image
          source={{
            uri:
              item.images && item.images.length > 0
                ? item.images[0]
                : "https://via.placeholder.com/150",
          }}
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
        <Swiper
          style={{ height: 300 }}
          showsButtons={true}
          loop={true}
          autoplay={true}
        >
          {product.images && product.images.length > 0 ? (
            product.images.map((imageUrl, index) => (
              <View key={index} className="w-full h-64">
                <Image
                  source={{ uri: imageUrl }}
                  className="w-full h-full rounded-lg"
                  resizeMode="contain"
                />
              </View>
            ))
          ) : (
            <View className="w-full h-64">
              <Image
                source={{ uri: "https://via.placeholder.com/150" }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>
          )}
        </Swiper>
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          {product.productName}
        </Text>
        <Text className="text-xl text-green-500 font-semibold mb-4">
          {product.price} VND
        </Text>
        <TouchableOpacity
          className="border-0 rounded-lg bg-green-800 flex items-center w-1/3 flex-row p-3 justify-center"
          onPress={handleFavorite}
        >
          <Icon name="heart" type="font-awesome" color="white" size={20} />
          <Text className="ml-2 text-white">{favoriteText}</Text>
        </TouchableOpacity>
        <Text className="text-base text-gray-600 mt-2">
          {product.description}
        </Text>

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
            <Text className="text-lg font-bold text-gray-800 mb-4">
              Sản phẩm đã xem
            </Text>
            <FlatList
              data={viewedProducts}
              renderItem={renderProductItem}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          </View>
        )}

        <View className="border-t-4 border-primary my-4"></View>


        {/* Mục Sản phẩm tương tự */}
        {similarProducts.length > 0 && (
          <View className="mt-2 mb-4">
            <Text className="text-lg font-bold text-gray-800 mb-4">
              Sản phẩm tương tự
            </Text>
            <FlatList
              data={similarProducts}
              renderItem={renderProductItem}
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
