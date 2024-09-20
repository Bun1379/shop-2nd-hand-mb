import React, { useState } from "react";
import { View, Text, Image, ScrollView, Modal } from "react-native";
import ProductFooter from "../Component/ProductFooter";
import ModalAddProduct from "../Component/ModalAddProduct";
import CartAPI from "../../API/CartAPI";

const ProductDetail = ({ route }) => {
  const { product } = route.params; // Nhận dữ liệu từ navigation
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState("1");
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
  return (
    <>
      <ScrollView className="flex-1 p-4 bg-white">
        {/* Hình ảnh sản phẩm */}
        <Image
          source={{
            uri: "https://th.bing.com/th/id/OIP.pRbr2XV7L1NEwYpS5noJEQHaHa?rs=1&pid=ImgDetMain",
          }}
          className="w-full h-64 rounded-lg mb-4"
          resizeMode="cover"
        />
        {/* Tên sản phẩm */}
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          {product.productName}
        </Text>
        {/* Giá sản phẩm */}
        <Text className="text-xl text-red-500 font-semibold mb-4">
          {product.price} VND
        </Text>
        {/* Mô tả sản phẩm */}
        <Text className="text-base text-gray-600">{product.description}</Text>
      </ScrollView>
      <ProductFooter onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
      <ModalAddProduct
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        quantity={quantity}
        setQuantity={setQuantity}
        handleConfirm={handleConfirm}
        productImage={
          "https://th.bing.com/th/id/OIP.pRbr2XV7L1NEwYpS5noJEQHaHa?rs=1&pid=ImgDetMain"
        }
        productPrice={product.price}
      />
    </>
  );
};

export default ProductDetail;
