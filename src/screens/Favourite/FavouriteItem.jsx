import { Button, Image, Text, TouchableOpacity, View } from "react-native";

const FavouriteItem = ({ product, handleFavorite, handleNavigate }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between p-4 bg-white my-1"
      onPress={() => handleNavigate(product)}
    >
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
              title="Bỏ yêu thích"
              onPress={() => handleFavorite(product?._id)}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default FavouriteItem;
