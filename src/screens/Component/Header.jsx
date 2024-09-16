import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, SearchBar } from "react-native-elements";

const Header = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // onSearch(query); // Gửi query về cho component cha
  };

  return (
    <View className="flex-row items-center">
      <SearchBar
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchQuery}
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
          width: "85%",
          alignItems: "center",
        }}
        inputContainerStyle={{
          backgroundColor: "#e0e0e0",
          borderRadius: 10,
        }}
      />
      <TouchableOpacity
        onPress={() => console.log("Go to cart")}
        className="justify-center flex-1"
        activeOpacity={0.7}
      >
        <Icon
          name="shopping-cart"
          type="font-awesome"
          size={31}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
