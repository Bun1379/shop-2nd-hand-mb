import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import CartAPI from "../../API/CartAPI";
import CartItem from "../Component/CartItem";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const fetchDataCart = async () => {
    try {
      const res = await CartAPI.GetCart();
      console.log(res.data.DT.items);
      setCart(res.data.DT.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataCart();
  }, []);
  return (
    <View>
      {cart.length > 0 ? (
        <View>
          {cart.map((item) => (
            <CartItem
              key={item.product._id}
              productId={item.product._id}
              productName={item.product.productName}
              initialQuantity={item.quantity}
            />
          ))}
          <Text>Total: {total}</Text>
        </View>
      ) : (
        <Text>Cart is empty</Text>
      )}
    </View>
  );
};
export default Cart;
