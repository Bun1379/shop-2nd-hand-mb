import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Modal } from "react-native";
import ProductFooter from "../Component/ProductFooter";
import ModalAddProduct from "../Component/ModalAddProduct";
import CartAPI from "../../API/CartAPI";
import Reviews from "../Review/Reviews";
import ReviewAPI from "../../API/ReviewAPI";

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [reviews, setReviews] = useState([]);

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

  useEffect(() => {
    fetchDataReviews();
  }, []);
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
        <Text className="text-lg font-semibold text-gray-800 mb-4 mt-3">
          Reviews
        </Text>
        {reviews.length === 0 && (
          <Text className="text-base text-gray-600 mt-3">Chưa có đánh giá</Text>
        )}
        <Reviews reviews={reviews} />
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
