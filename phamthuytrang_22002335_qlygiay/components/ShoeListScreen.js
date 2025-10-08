import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { shoeService } from '../services/shoeService.js ';

const ShoeListScreen = ({ navigation }) => {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch danh sách giày
  const fetchShoes = async () => {
    try {
      const response = await shoeService.getAllShoes();
      if (response.status === 200) {
        setShoes(response.data);
      } else {
        Alert.alert('Lỗi', 'Không thể tải danh sách sản phẩm');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối đến server');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchShoes();
  }, []);

  // Xóa sản phẩm
  const handleDeleteShoe = async (id, productName) => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc muốn xóa "${productName}"?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await shoeService.deleteShoe(id);
              if (response.status === 200) {
                Alert.alert('Thành công', 'Đã xóa sản phẩm');
                fetchShoes();
              } else {
                Alert.alert('Lỗi', 'Không thể xóa sản phẩm');
              }
            } catch (error) {
              Alert.alert('Lỗi', 'Không thể xóa sản phẩm');
            }
          }
        }
      ]
    );
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Render mỗi item sản phẩm
  const renderShoeItem = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productHeader}>
        <Text style={styles.productCode}>{item.productCode}</Text>
        <Text style={styles.productSize}>Size: {item.size}</Text>
      </View>
      <Text style={styles.productName}>{item.productName}</Text>
      <View style={styles.productDetails}>
        <Text style={styles.productPrice}>{formatCurrency(parseInt(item.price))}</Text>
        <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
      </View>
      <View style={styles.productActions}>
        <TouchableOpacity 
          style={[styles.btn, styles.btnEdit]}
          onPress={() => navigation.navigate('AddShoe', { shoe: item, onGoBack: fetchShoes })}
        >
          <Text style={styles.btnText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.btn, styles.btnDelete]}
          onPress={() => handleDeleteShoe(item.id, item.productName)}
        >
          <Text style={styles.btnText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#667eea" />
          <Text>Đang tải dữ liệu...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QUẢN LÝ BÁN GIÀY</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddShoe', { onGoBack: fetchShoes })}
        >
          <Text style={styles.addButtonText}>+ Thêm mới</Text>
        </TouchableOpacity>
      </View>

      {shoes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>📦</Text>
          <Text style={styles.emptyStateTitle}>Không có sản phẩm nào</Text>
          <Text style={styles.emptyStateText}>Hãy thêm sản phẩm đầu tiên của bạn!</Text>
        </View>
      ) : (
        <FlatList
          data={shoes}
          renderItem={renderShoeItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  listContent: {
    padding: 10,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productCode: {
    fontWeight: 'bold',
    color: '#667eea',
    fontSize: 16,
  },
  productSize: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  productQuantity: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '600',
  },
  productActions: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  btnEdit: {
    backgroundColor: '#ffc107',
  },
  btnDelete: {
    backgroundColor: '#dc3545',
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6c757d',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShoeListScreen;