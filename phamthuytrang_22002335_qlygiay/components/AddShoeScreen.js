import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { shoeService } from '../services/shoeService.js ';

const AddShoeScreen = ({ navigation, route }) => {
  const { shoe, onGoBack } = route.params || {};
  const isEdit = !!shoe;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productCode: '',
    productName: '',
    size: '',
    price: '',
    quantity: '',
    description: ''
  });

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    if (shoe) {
      setFormData({
        productCode: shoe.productCode || '',
        productName: shoe.productName || '',
        size: shoe.size || '',
        price: shoe.price ? shoe.price.toString() : '',
        quantity: shoe.quantity ? shoe.quantity.toString() : '',
        description: shoe.description || ''
      });
    }
  }, [shoe]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSizeSelect = (size) => {
    setFormData(prev => ({
      ...prev,
      size
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.productCode || !formData.productName || !formData.size || 
        !formData.price || !formData.quantity) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (isNaN(formData.price) || parseInt(formData.price) <= 0) {
      Alert.alert('Lỗi', 'Giá sản phẩm phải là số dương');
      return;
    }

    if (isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
      Alert.alert('Lỗi', 'Số lượng phải là số dương');
      return;
    }

    setLoading(true);
    try {
      let response;
      if (isEdit) {
        response = await shoeService.updateShoe(shoe.id, formData);
      } else {
        response = await shoeService.createShoe(formData);
      }

      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          'Thành công', 
          isEdit ? 'Đã cập nhật sản phẩm' : 'Đã thêm sản phẩm mới',
          [
            { 
              text: 'OK', 
              onPress: () => {
                if (onGoBack) onGoBack();
                navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert('Lỗi', 'Không thể lưu sản phẩm');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>
          {isEdit ? 'CẬP NHẬT SẢN PHẨM' : 'THÊM SẢN PHẨM MỚI'}
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Mã sản phẩm *</Text>
          <TextInput
            style={styles.input}
            value={formData.productCode}
            onChangeText={(text) => handleInputChange('productCode', text)}
            placeholder="Nhập mã sản phẩm"
            editable={!isEdit}
          />

          <Text style={styles.label}>Tên sản phẩm *</Text>
          <TextInput
            style={styles.input}
            value={formData.productName}
            onChangeText={(text) => handleInputChange('productName', text)}
            placeholder="Nhập tên sản phẩm"
          />

          <Text style={styles.label}>Chọn size *</Text>
          <View style={styles.sizeOptions}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  formData.size === size && styles.sizeOptionSelected
                ]}
                onPress={() => handleSizeSelect(size)}
              >
                <Text style={[
                  styles.sizeOptionText,
                  formData.size === size && styles.sizeOptionTextSelected
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Giá (VND) *</Text>
          <TextInput
            style={styles.input}
            value={formData.price}
            onChangeText={(text) => handleInputChange('price', text)}
            placeholder="Nhập giá sản phẩm"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Số lượng *</Text>
          <TextInput
            style={styles.input}
            value={formData.quantity}
            onChangeText={(text) => handleInputChange('quantity', text)}
            placeholder="Nhập số lượng"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Mô tả</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder="Nhập mô tả sản phẩm"
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>
                {isEdit ? 'CẬP NHẬT SẢN PHẨM' : 'THÊM SẢN PHẨM'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  form: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  sizeOption: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  sizeOptionSelected: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  sizeOptionText: {
    fontWeight: '600',
    color: '#333',
  },
  sizeOptionTextSelected: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddShoeScreen;