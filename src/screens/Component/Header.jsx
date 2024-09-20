import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Platform, StatusBar } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = ({}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    navigation.navigate("Search", { searchQuery });
  };
  const handleBackBtn = () => {
    navigation.goBack();
  };
  useEffect(() => {
    if (route.name === "Search") {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  }, [route.name]);
  return (
    <View className="flex-row items-center">
      {isSearch && (
        <TouchableOpacity
          onPress={() => handleBackBtn()}
          className="justify-center flex-1"
          activeOpacity={0.7}
        >
          <Icon
            name="chevron-left"
            type="font-awesome"
            size={31}
            color="black"
          />
        </TouchableOpacity>
      )}

      <SearchBar
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchQuery}
        onSubmitEditing={handleSearchSubmit}
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
          height: 40,
        }}
      />
      {!isSearch && (
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
      )}
    </View>
  );
};

export default Header;
