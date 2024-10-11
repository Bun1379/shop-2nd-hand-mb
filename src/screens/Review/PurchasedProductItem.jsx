import { useNavigation } from "@react-navigation/native";
import { Button, View, Text, Image } from "react-native";

const PurchasedProductItem = ({ product }) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center justify-between p-4 bg-white my-1">
      <View className="flex-row items-center">
        <Image
          source={{
            uri: product?.images[0],
          }}
          className="w-24 h-24 rounded-lg"
          resizeMode="cover"
        />
        <View className="ml-4 flex-shrink">
          <Text
            className="text-lg font-semibold text-gray-800"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {product?.productName}
          </Text>
          <Text className="text-base text-gray-600">Size: {product?.size}</Text>
          <View className="mt-2 w-32">
            <Button
              title="Đánh giá"
              onPress={() =>
                navigation.navigate("Thêm đánh giá", { productId: product._id })
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PurchasedProductItem;
