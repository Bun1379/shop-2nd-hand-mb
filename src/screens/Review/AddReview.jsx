import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { Rating } from "react-native-ratings";
import ReviewAPI from "../../API/ReviewAPI";
import { useNavigation } from "@react-navigation/native";

const AddReview = ({ route }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { productId } = route.params;
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const review = {
      rating,
      comment,
    };
    review.product = productId;
    const response = await ReviewAPI.CreateReview(review);
    if (response.status === 200) {
      Alert.alert("Review successfully");
      navigation.goBack();
    } else {
      Alert.alert("Review failed");
    }
  };

  return (
    <View>
      <Rating
        ratingCount={5}
        imageSize={60}
        showRating
        onFinishRating={(rating) => setRating(rating)}
      />
      <TextInput
        placeholder="Nhập bình luận"
        value={comment}
        onChangeText={(text) => setComment(text)}
        style={{ borderWidth: 1, borderColor: "gray", padding: 10 }}
      />
      <View className="mt-2">
        <Button title="Gửi đánh giá" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default AddReview;
