import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AddressAPI from "../../API/AddressAPI";
import ModalAddress from "./ModalAddress";

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            const response = await AddressAPI.GetAddressByUser();
            if (response.status === 200) setAddresses(response.data.DT);
        } catch (error) {
            alert("Lỗi khi lấy địa chỉ: " + error.response.data.EM);
        }
    };

    const openModal = (address = null) => {
        setCurrentAddress(address);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentAddress(null);
    };

    const handleSave = async (addressData) => {
        try {
            if (currentAddress) {
                await AddressAPI.UpdateAddress(currentAddress._id, addressData);
            } else {
                await AddressAPI.CreateAddress(addressData);
            }
            alert("Lưu địa chỉ thành công !");
        } catch (error) {
            alert("Lỗi khi lưu: " + error.response.data.EM);
        }
        closeModal();
        loadAddresses();
    };

    const handleDelete = async (id) => {
        try {
            await AddressAPI.DeleteAddress(id);
            loadAddresses();
            alert("Xóa địa chỉ thành công !");
        } catch (error) {
            alert("Lỗi khi xóa: " + error.response.data.EM);
        }
    };

    const handleSetDefault = async (id) => {
        try {
            await AddressAPI.SetDefaultAddress(id);
            loadAddresses();
            alert("Đặt địa chỉ mặc định thành công !");
        } catch (error) {
            alert("Lỗi khi đặt mặc định: " + error.response.data.EM);
        }
    };

    const renderAddress = ({ item }) => (
        <View className="p-4 border-b border-gray-200 bg-white border border-primary rounded-lg">
            {item.isDefault && (
                <Text className="absolute top-5 right-5 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    Mặc định
                </Text>
            )}
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-gray-700 mt-1">Số điện thoại: {item.phone}</Text>
            <Text className="text-gray-700">
                Địa chỉ: {item.address}, {item.district}, {item.ward}, {item.city}
            </Text>
            <View className="flex-row mt-2 space-x-2">
                <TouchableOpacity onPress={() => openModal(item)} className="bg-yellow-500 px-3 py-1 rounded">
                    <Text className="text-white">Cập Nhật</Text>
                </TouchableOpacity>
                {!item.isDefault && (
                    <TouchableOpacity onPress={() => handleDelete(item._id)} className="bg-red-500 px-3 py-1 rounded">
                        <Text className="text-white">Xóa</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    onPress={() => handleSetDefault(item._id)}
                    className={`bg-blue-500 px-3 py-1 rounded ${item.isDefault ? "opacity-50" : ""}`}
                    disabled={item.isDefault}
                >
                    <Text className="text-white">Đặt làm mặc định</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View className="flex-1 p-4">
            <TouchableOpacity onPress={() => openModal()} className="bg-primary p-3 rounded mb-4">
                <Text className="text-center text-white">Thêm địa chỉ</Text>
            </TouchableOpacity>
            <FlatList
                data={addresses}
                keyExtractor={(item) => item._id}
                renderItem={renderAddress}
            />
            {showModal && (
                <ModalAddress
                    show={showModal}
                    handleClose={closeModal}
                    onSave={handleSave}
                    initialData={currentAddress}
                />
            )}
        </View>
    );
};

export default Address;
