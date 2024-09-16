import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Item = ({ imageUrl, name, price }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price} VND</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "47%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    // padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
    textAlign: "right",
  },
});

export default Item;
