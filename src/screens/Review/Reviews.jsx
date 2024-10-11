import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";

const Reviews = ({ reviews }) => {
  return (
    // <FlatList
    //   data={reviews}
    //   renderItem={({ item }) => <ReviewItem review={item} />}
    //   keyExtractor={(item) => item._id}
    // />
    reviews.map((review) => <ReviewItem key={review._id} review={review} />)
  );
};

export default Reviews;
