import React, { useState, useEffect, useRef } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator,
  RefreshControl,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const API_URL = 'https://68ccd335da4697a7f303ad61.mockapi.io/name_price';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  // State cho form thêm sản phẩm
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  // Refs để clear nội dung
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(null);

  // Hàm lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    try {
      console.log('Đang tải dữ liệu từ API...');
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dữ liệu nhận được:', data);
      setProducts(data);
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Hàm làm mới dữ liệu khi kéo xuống
  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };


  const addProduct = async () => {
    if (!productName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên sản phẩm');
      return;
    }

    if (!productPrice.trim() || isNaN(productPrice) || parseFloat(productPrice) <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập giá sản phẩm hợp lệ');
      return;
    }

    setAdding(true);

    try {
      const newProduct = {
        name: productName.trim(),
        price: parseFloat(productPrice),
        createdAt: new Date().toISOString()
      };

      console.log('Đang thêm sản phẩm:', newProduct);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdProduct = await response.json();
      console.log('Sản phẩm đã thêm:', createdProduct);

      // Clear form
      setProductName('');
      setProductPrice('');
      
      // Focus lại input đầu tiên
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }

      // Refresh danh sách sản phẩm
      fetchProducts();
      
      Alert.alert('Thành công', 'Đã thêm sản phẩm thành công!');
      
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      Alert.alert('Lỗi', 'Không thể thêm sản phẩm');
    } finally {
      setAdding(false);
    }
  };

  // Hàm mở chế độ chỉnh sửa
  const startEditing = (product) => {
    setEditingProduct(product);
  };

  // Hàm hủy chỉnh sửa
  const cancelEditing = () => {
    setEditingProduct(null);
  };

  // Hàm lưu thay đổi sản phẩm
  const saveProduct = async (updatedProduct) => {
    try {
      console.log('Đang cập nhật sản phẩm:', updatedProduct);

      const response = await fetch(`${API_URL}/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedProduct.name,
          price: parseFloat(updatedProduct.price),
          category: updatedProduct.category,
          description: updatedProduct.description,
          updatedAt: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedProduct = await response.json();
      console.log('Sản phẩm đã cập nhật:', savedProduct);

      // Cập nhật danh sách sản phẩm
      setProducts(products.map(product => 
        product.id === updatedProduct.id ? savedProduct : product
      ));

      setEditingProduct(null);
      Alert.alert('Thành công', 'Đã cập nhật sản phẩm thành công!');
      
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật sản phẩm');
    }
  };

  // Hàm xóa sản phẩm
  const deleteProduct = async (productId, productName) => {
    Alert.alert(
      'Xóa sản phẩm',
      `Bạn có chắc muốn xóa "${productName}"?`,
      [
        {
          text: 'Hủy',
          style: 'cancel'
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              console.log('Đang xóa sản phẩm:', productId);

              const response = await fetch(`${API_URL}/${productId}`, {
                method: 'DELETE',
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              // Cập nhật danh sách sản phẩm
              setProducts(products.filter(product => product.id !== productId));
              
              Alert.alert('Thành công', 'Đã xóa sản phẩm thành công!');
              
            } catch (error) {
              console.error('Lỗi khi xóa sản phẩm:', error);
              Alert.alert('Lỗi', 'Không thể xóa sản phẩm');
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
  };

  // Component Modal chỉnh sửa sản phẩm
  const EditProductModal = ({ product, onSave, onCancel }) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price.toString());

    const handleSave = () => {
      // Validation
      if (!name.trim()) {
        Alert.alert('Lỗi', 'Vui lòng nhập tên sản phẩm');
        return;
      }

      if (!price.trim() || isNaN(price) || parseFloat(price) <= 0) {
        Alert.alert('Lỗi', 'Vui lòng nhập giá sản phẩm hợp lệ');
        return;
      }

      onSave({ ...product, name, price: parseFloat(price) });
    };

    return (
      <Modal visible={true} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Chỉnh sửa sản phẩm</Text>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tên sản phẩm *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nhập tên sản phẩm..."
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Giá sản phẩm *</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholder="Nhập giá sản phẩm..."
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={onCancel}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  // Component hiển thị khi đang tải
  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="rgb(173, 223, 173)" />
      <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
    </View>
  );

  // Component hiển thị mỗi item sản phẩm
  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {typeof item.price === 'number' 
            ? item.price.toLocaleString('vi-VN') 
            : item.price} VND
        </Text>
        {item.category && (
          <Text style={styles.productCategory}>Danh mục: {item.category}</Text>
        )}
        {item.createdAt && (
          <Text style={styles.productDate}>
            Ngày tạo: {new Date(item.createdAt).toLocaleDateString('vi-VN')}
          </Text>
        )}
      </View>
      
      <View style={styles.productActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => startEditing(item)}
          disabled={deleting}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => deleteProduct(item.id, item.name)}
          disabled={deleting}
        >
          {deleting ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.deleteButtonText}>Delete</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  // Component hiển thị khi không có sản phẩm
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>📦</Text>
      <Text style={styles.emptyTitle}>Chưa có sản phẩm nào</Text>
      <Text style={styles.emptySubtitle}>Hãy thêm sản phẩm đầu tiên của bạn!</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Manager AppProduct</Text>
          </View>
          {renderLoading()}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Manager AppProduct</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Form thêm sản phẩm */}
          <View style={styles.addProductContainer}>
            <Text style={styles.sectionTitle}>Thêm sản phẩm mới</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tên sản phẩm *</Text>
              <TextInput
                ref={nameInputRef}
                style={styles.input}
                placeholder="Nhập tên sản phẩm..."
                value={productName}
                onChangeText={setProductName}
                editable={!adding}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Giá sản phẩm *</Text>
              <TextInput
                ref={priceInputRef}
                style={styles.input}
                placeholder="Nhập giá sản phẩm..."
                value={productPrice}
                onChangeText={setProductPrice}
                keyboardType="numeric"
                editable={!adding}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.addButton,
                adding && styles.addButtonDisabled
              ]}
              onPress={addProduct}
              disabled={adding}
            >
              {adding ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Product List */}
          <View style={styles.productsContainer}>
            <Text style={styles.sectionTitle}>
              Danh sách sản phẩm ({products.length})
            </Text>
            
            <FlatList
              data={products}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['rgb(173, 223, 173)']}
                  tintColor="rgb(173, 223, 173)"
                />
              }
              ListEmptyComponent={renderEmptyList}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={products.length === 0 ? styles.emptyListContent : null}
            />
          </View>
        </ScrollView>

        {/* Edit Product Modal */}
        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onSave={saveProduct}
            onCancel={cancelEditing}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgb(173, 223, 173)',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  addProductContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  productsContainer: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: 'rgb(173, 223, 173)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  addButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: 'rgb(173, 223, 173)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  productDate: {
    fontSize: 12,
    color: '#95a5a6',
  },
  productActions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 12,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: 'rgb(173, 223, 173)',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  editButtonText: {
    color: '#2c3e50',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  emptyListContent: {
    flexGrow: 1,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    backgroundColor: 'rgb(173, 223, 173)',
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
  saveButton: {
    backgroundColor: 'rgb(173, 223, 173)',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;