import { View, Image, Text } from "react-native";
import { Rating } from "react-native-ratings";

const ReviewItem = ({ review }) => {
  return (
    <View className="flex flex-row my-2">
      <Image
        source={{ uri: review.user.image }}
        className="w-12 h-12 rounded-full"
        resizeMode="cover"
      />
      <View className="flex flex-col ml-3">
        <Text className="font-semibold">{review.user.username}</Text>
        <Rating imageSize={20} readonly startingValue={review.rating} />
        <Text>{review.comment}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
