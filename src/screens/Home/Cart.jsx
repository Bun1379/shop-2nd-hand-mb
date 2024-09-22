import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import CartAPI from "../../API/CartAPI";
import CartItem from "../Component/CartItem";
import CartFooter from "../Component/CartFooter";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
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
      item.product._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
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
            selected={item.selected}
            onCheckbox={handleCheckbox}
            handleUpdateCart={handleUpdateCart}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }} // Tạo khoảng trống cho CartFooter
      />

      <CartFooter
        total={total}
        onCheckout={() => console.log("Checkout clicked")}
      />
    </View>
  );
};
export default Cart;
