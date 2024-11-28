import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ToastAndroid } from "react-native";
import DiscountAPI from "../../API/DiscountAPI";
import UserAPI from "../../API/UserAPI";

const DiscountSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const [userDiscounts, setUserDiscounts] = useState([]);
  const itemsPerPage = 3;

  // Tính toán nhóm giảm giá
  const groupedDiscounts = useMemo(() => {
    const groups = [];
    for (let i = 0; i < discounts.length; i += itemsPerPage) {
      groups.push(discounts.slice(i, i + itemsPerPage));
    }
    return groups;
  }, [discounts]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedDiscounts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? groupedDiscounts.length - 1 : prevIndex - 1
    );
  };

  const fetchDataDiscounts = async () => {
    try {
      const response = await DiscountAPI.getAllValidDiscount();
      setDiscounts(response.data.DT);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const fetchUserDiscounts = async () => {
    try {
      const response = await UserAPI.GetUserInfo();
      setUserDiscounts(response.data.DT.discounts);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleReceiveDiscount = async (discountCode) => {
    try {
      const response = await UserAPI.PutUpdateDiscount(discountCode);
      ToastAndroid.show(response.data.EM, ToastAndroid.SHORT);
      fetchUserDiscounts();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    fetchDataDiscounts();
    fetchUserDiscounts();
  }, []);

  const renderDiscount = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Mã: {item.discountCode}</Text>
      <Text style={styles.text}>Giảm: {item.discountPercentage}%</Text>
      {userDiscounts.find((userDiscount) => userDiscount._id === item._id) ? (
        <Text style={styles.receivedText}>Đã nhận</Text>
      ) : (
        <Button
          title="Lưu"
          onPress={() => handleReceiveDiscount(item._id)}
          color="#28a745"
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Discounts</Text>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={handlePrev}>
          <Text style={styles.navButton}>{"<"}</Text>
        </TouchableOpacity>
        <FlatList
          data={groupedDiscounts[currentIndex]}
          renderItem={renderDiscount}
          keyExtractor={(item) => item._id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navButton: {
    fontSize: 24,
    paddingHorizontal: 16,
    color: "#007bff",
  },
  card: {
    width: 200,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
  },
  receivedText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DiscountSlider;
