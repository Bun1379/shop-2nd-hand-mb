import { FlatList, Text, View } from "react-native";
import UserAPI from "../../API/UserAPI";
import DiscountItem from "./DiscountItem";
import { useEffect, useState } from "react";

const Discount = () => {
  const [discounts, setDiscounts] = useState([]);
  const fetchListDiscount = async () => {
    try {
      const response = await UserAPI.GetUserInfo();
      if (response.status === 200) {
        setDiscounts(response.data.DT.discounts);
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  useEffect(() => {
    fetchListDiscount();
  }, []);
  return (
    <View>
      <FlatList
        data={discounts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <DiscountItem discount={item} />}
      />
    </View>
  );
};

export default Discount;
