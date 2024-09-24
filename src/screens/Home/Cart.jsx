import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import CartAPI from "../../API/CartAPI";
import CartItem from "../Component/CartItem";
import CartFooter from "../Component/CartFooter";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigation();

  const fetchDataCart = async () => {
    try {
      const res = await CartAPI.GetCart();
      const rawCart = res.data.DT.items;
      const cart = rawCart.map((item) => ({
        ...item,
        selected: false,
      }));
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckbox = (productId) => {
    const newCart = cart.map((item) =>
      item.product._id === productId
        ? { ...item, selected: !item.selected }
        : item
    );
    setCart(newCart);
  };

  const handleUpdateCart = (productId, newQuantity) => {
    const newCart = cart.map((item) =>
      item.product._id === productId
        ? {
            ...item,
            quantity: newQuantity,
            price: item.product.price * newQuantity,
          }
        : item
    );
    setCart(newCart);
  };

  const handleCheckOut = () => {
    const selectedItems = cart.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn sản phẩm để mua");
      return;
    }
    navigate.navigate("Checkout", { items: selectedItems });
  };

  useEffect(() => {
    fetchDataCart();
  }, []);

  useEffect(() => {
    const total = cart
      .filter((item) => item.selected) // Chỉ tính những item được chọn
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0); // Cộng dồn giá
    setTotal(total);
  }, [cart]);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product._id}
        renderItem={({ item }) => (
          <CartItem
            productId={item.product._id}
            productName={item.product.productName}
            initialQuantity={item.quantity}
            price={item.product.price}
            maxQuantity={item.product.quantity}
            selected={item.selected}
            onCheckbox={handleCheckbox}
            handleUpdateCart={handleUpdateCart}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <CartFooter total={total} onCheckout={handleCheckOut} />
    </View>
  );
};
export default Cart;
