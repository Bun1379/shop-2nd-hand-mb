import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AddressAPI from "../../API/AddressAPI";

const ModalAddress = ({ show, handleClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        phone: initialData?.phone || '',
        city: null,
        district: null,
        ward: null,
        address: initialData?.address || '',
    });

    const [locations, setLocations] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^(0[3|5|7|8|9]\d{8})$/;
        return phoneRegex.test(phone);
    };

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            .then((response) => response.json())
            .then((data) => setLocations(data));
    }, []);

    useEffect(() => {
        if (formData.city) {
            const selectedCity = locations.find(city => city.Name === formData.city);
            setDistricts(selectedCity?.Districts || []);
        } else {
            setDistricts([]);
        }
    }, [formData.city, locations]);

    useEffect(() => {
        if (formData.district) {
            const selectedDistrict = districts.find(district => district.Name === formData.district);
            setWards(selectedDistrict?.Wards || []);
        } else {
            setWards([]);
        }
    }, [formData.district, districts]);


    const handleSubmit = async () => {
        try {
            if (!isValidPhoneNumber(formData.phone)) {
                alert("Số điện thoại không hợp lệ!");
                return;
            }
            const rs = await AddressAPI.CheckAddress({
                city: formData.city,
                district: formData.district,
                ward: formData.ward,
                specificAddress: formData.address
            });
            if (rs.status === 200) {
                onSave(formData);
            }
        }
        catch (error) {
            alert("Lỗi: " + error.response.data.EM);
        }
    };

    return (
        <Modal visible={show} animationType="slide" onRequestClose={handleClose}>
            <View className="p-5">
                <Text className="text-lg font-semibold mb-2">Tên người nhận</Text>
                <TextInput
                    className="border border-primary rounded-md p-3 mb-4 bg-white"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                />

                <Text className="text-lg font-semibold mb-2">Số điện thoại</Text>
                <TextInput
                    className="border border-primary rounded-md p-3 mb-4 bg-white"
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    keyboardType="phone-pad"
                />

                <Text className="text-lg font-semibold mb-2">Thành phố</Text>
                <View className="border border-primary rounded-md mb-4 bg-white">

                    <Picker
                        selectedValue={formData.city}
                        onValueChange={(value) => setFormData({ ...formData, city: value })}
                    >
                        <Picker.Item label="Chọn thành phố" value={null} />
                        {locations.map(city => (
                            <Picker.Item key={city.Name} label={city.Name} value={city.Name} />
                        ))}
                    </Picker>
                </View>

                <Text className="text-lg font-semibold mb-2">Quận/Huyện</Text>
                <View className="border border-primary rounded-md mb-4 bg-white">

                    <Picker
                        selectedValue={formData.district}
                        onValueChange={(value) => setFormData({ ...formData, district: value })}
                        enabled={formData.city !== null}
                    >
                        <Picker.Item label="Chọn quận/huyện" value={null} />
                        {districts.map(district => (
                            <Picker.Item key={district.Name} label={district.Name} value={district.Name} />
                        ))}
                    </Picker>
                </View>
                <Text className="text-lg font-semibold mb-2">Phường/Xã</Text>
                <View className="border border-primary rounded-md mb-4 bg-white">
                    <Picker
                        selectedValue={formData.ward}
                        onValueChange={(value) => setFormData({ ...formData, ward: value })}
                        enabled={formData.district !== null}
                    >
                        <Picker.Item label="Chọn phường/xã" value={null} />
                        {wards.map(ward => (
                            <Picker.Item key={ward.Name} label={ward.Name} value={ward.Name} />
                        ))}
                    </Picker>
                </View>

                <Text className="text-lg font-semibold mb-2">Địa chỉ cụ thể</Text>
                <TextInput
                    className="border border-primary rounded-md p-3 mb-4 bg-white"
                    value={formData.address}
                    onChangeText={(text) => setFormData({ ...formData, address: text })}
                />

                <TouchableOpacity
                    onPress={handleSubmit}
                    style={{ backgroundColor: '#388E3C', padding: 12, alignItems: 'center', borderRadius: 4, marginBottom: 10 }}
                >
                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Lưu</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleClose}
                    style={{ backgroundColor: '#9E9E9E', padding: 12, alignItems: 'center', borderRadius: 4 }}
                >
                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Đóng</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ModalAddress;
