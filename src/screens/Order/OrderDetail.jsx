import { useEffect, useState } from "react";
import OrderAPI from "../../API/OrderAPI";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const OrderDetail = ({ route }) => {
  const { order } = route.params;
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const fetchDataOrder = async () => {
    try {
      const response = await OrderAPI.GetOrderById(order._id);
      const fetchOrder = response.data.DT;
      setOrderDetail(fetchOrder);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, [order]);

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          ListHeaderComponent={
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold">
                Mã đơn hàng: {orderDetail._id}
              </Text>
              <Text className="text-lg text-primary font-bold">
                Tổng tiền: {orderDetail.totalAmount.toLocaleString('vi-VN')} VNĐ
              </Text>
              <Text className="text-lg text-gray-600">
                Trạng thái: {orderDetail.status}
              </Text>
              <Text className="text-lg text-gray-600">
                Người nhận: {orderDetail.name}
              </Text>
              <Text className="text-lg text-gray-600">
                Số điện thoại: {orderDetail.phone}
              </Text>
              <Text className="text-lg text-gray-600">
                Địa chỉ: {orderDetail.address}
              </Text>
              <Text className="text-lg text-gray-600">
                Ngày tạo: {new Date(orderDetail.createdAt).toLocaleDateString('vi-VN')}
              </Text>
            </View>
          }
          data={orderDetail.products}
          keyExtractor={(item) => item.product._id.toString()}
          renderItem={({ item }) => (
            <View className="flex-row items-center p-4 border-b border-gray-200">
              <Image
                source={{ uri: item.product.images[0] }}
                className="w-20 h-20 rounded-lg"
              />
              <View className="ml-4 flex-1">
                <Text className="text-base font-semibold">
                  {item.product.productName}
                </Text>
                <Text className="text-sm text-gray-500">
                  {item.product.price.toLocaleString('vi-VN')} VNĐ x {item.quantity}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default OrderDetail;
