import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Alert,
  Modal,
  ScrollView
} from 'react-native';

// Sử dụng MockAPI - bạn cần tạo resource 'foods' trên mockapi.io
const API_URL = 'https://68cd4af9da4697a7f30575de.mockapi.io/products';

const FoodManagerApp = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // State for new food
  const [newFood, setNewFood] = useState({
    name: '',
    price: '',
    unit: 'kg',
    category: 'Rau xanh'
  });

  // State for editing food
  const [editFood, setEditFood] = useState({
    name: '',
    price: '',
    unit: 'kg',
    category: 'Rau xanh'
  });

  // Refs
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(null);

  // Categories and units
  const categories = useMemo(() => ['Rau xanh', 'Củ quả', 'Trái cây', 'Thịt cá', 'Khác'], []);
  const units = useMemo(() => ['kg', 'g', 'củ', 'quả', 'bó', 'túi'], []);

  // Fetch foods from API
  const fetchFoods = useCallback(async () => {
    try {
      console.log('Fetching foods from API...');
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched foods:', data);
      setFoods(data);
    } catch (error) {
      console.error('Error fetching foods:', error);
      // Sample data khi không kết nối được API
      const sampleFoods = [
        { id: '1', name: 'Rau muống tưới', price: '12.000', unit: 'kg', category: 'Rau xanh' },
        { id: '2', name: 'Cà chua hữu cơ', price: '25.000', unit: 'kg', category: 'Củ quả' },
        { id: '3', name: 'Bắp cải tím', price: '18.000', unit: 'củ', category: 'Rau xanh' }
      ];
      setFoods(sampleFoods);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Load data on app start
  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  // Add new food - ĐÃ SỬA LỖI
  const addFood = useCallback(async () => {
    if (!newFood.name.trim() || !newFood.price.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên và giá thực phẩm');
      return;
    }

    // Tạo food object mới
    const foodToAdd = {
      name: newFood.name.trim(),
      price: newFood.price.trim(),
      unit: newFood.unit,
      category: newFood.category
    };

    console.log('Adding food:', foodToAdd);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodToAdd),
      });

      const result = await response.json();
      console.log('Add response:', result);

      if (response.ok) {
        // Clear input fields
        setNewFood({
          name: '',
          price: '',
          unit: 'kg',
          category: 'Rau xanh'
        });
        
        // Refresh list
        fetchFoods();
        Alert.alert('Thành công', 'Đã thêm thực phẩm thành công');
      } else {
        throw new Error('Failed to add food');
      }
    } catch (error) {
      console.error('Error adding food:', error);
      // Thêm vào local state nếu API fail
      const newItem = {
        id: Date.now().toString(),
        ...foodToAdd
      };
      setFoods(prev => [...prev, newItem]);
      setNewFood({
        name: '',
        price: '',
        unit: 'kg',
        category: 'Rau xanh'
      });
      Alert.alert('Thành công', 'Đã thêm thực phẩm (local)');
    }
  }, [newFood, fetchFoods]);

  // Update food - ĐÃ SỬA LỖI
  const updateFood = useCallback(async () => {
    if (!editFood.name.trim() || !editFood.price.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên và giá thực phẩm');
      return;
    }

    const foodToUpdate = {
      name: editFood.name.trim(),
      price: editFood.price.trim(),
      unit: editFood.unit,
      category: editFood.category
    };

    console.log('Updating food:', editingId, foodToUpdate);

    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodToUpdate),
      });

      const result = await response.json();
      console.log('Update response:', result);

      if (response.ok) {
        setEditingId(null);
        setModalVisible(false);
        fetchFoods();
        Alert.alert('Thành công', 'Đã cập nhật thực phẩm thành công');
      } else {
        throw new Error('Failed to update food');
      }
    } catch (error) {
      console.error('Error updating food:', error);
      // Update local state nếu API fail
      setFoods(prev => prev.map(item => 
        item.id === editingId 
          ? { ...item, ...foodToUpdate }
          : item
      ));
      setEditingId(null);
      setModalVisible(false);
      Alert.alert('Thành công', 'Đã cập nhật thực phẩm (local)');
    }
  }, [editFood, editingId, fetchFoods]);

  // Delete food - ĐÃ SỬA LỖI
  const deleteFood = useCallback((id, name) => {
    Alert.alert(
      'Xóa thực phẩm',
      `Bạn có chắc muốn xóa "${name}"?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            console.log('Deleting food:', id);
            
            try {
              const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
              });

              console.log('Delete response status:', response.status);

              if (response.ok) {
                fetchFoods();
                Alert.alert('Thành công', 'Đã xóa thực phẩm thành công');
              } else {
                throw new Error('Failed to delete food');
              }
            } catch (error) {
              console.error('Error deleting food:', error);
              // Xóa khỏi local state nếu API fail
              setFoods(prev => prev.filter(item => item.id !== id));
              Alert.alert('Thành công', 'Đã xóa thực phẩm (local)');
            }
          },
        },
      ]
    );
  }, [fetchFoods]);

  // Start editing
  const startEditing = useCallback((item) => {
    console.log('Starting edit for:', item);
    setEditingId(item.id);
    setEditFood({
      name: item.name || '',
      price: item.price || '',
      unit: item.unit || 'kg',
      category: item.category || 'Rau xanh'
    });
    setModalVisible(true);
  }, []);

  // Cancel editing
  const cancelEditing = useCallback(() => {
    setEditingId(null);
    setModalVisible(false);
  }, []);

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFoods();
  }, [fetchFoods]);

  // Memoized food list
  const memoizedFoods = useMemo(() => foods, [foods]);

  // Render food item
  const renderFoodItem = useCallback(({ item }) => (
    <View style={styles.foodItem}>
      <View style={styles.foodInfo}>
        <View style={styles.foodDetails}>
          <Text style={styles.foodName}>#{item.name}</Text>
          <Text style={styles.foodPrice}>{item.price} VND/{item.unit}</Text>
          <Text style={styles.foodCategory}>{item.category}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.editBtn]}
            onPress={() => startEditing(item)}
          >
            <Text style={styles.buttonText}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteBtn]}
            onPress={() => deleteFood(item.id, item.name)}
          >
            <Text style={styles.buttonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ), [startEditing, deleteFood]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.header}>Food Manager App</Text>

        {/* Add Food Form */}
        <ScrollView style={styles.addForm}>
          <Text style={styles.label}>Tên thực phẩm</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên thực phẩm..."
            value={newFood.name}
            onChangeText={(text) => setNewFood(prev => ({ ...prev, name: text }))}
            returnKeyType="next"
          />

          <Text style={styles.label}>Giá</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập giá thực phẩm..."
            value={newFood.price}
            onChangeText={(text) => setNewFood(prev => ({ ...prev, price: text }))}
            keyboardType="numeric"
            returnKeyType="done"
          />

          <Text style={styles.label}>Đơn vị</Text>
          <View style={styles.pickerContainer}>
            {units.map((unit) => (
              <TouchableOpacity
                key={unit}
                style={[
                  styles.unitButton,
                  newFood.unit === unit && styles.unitButtonSelected
                ]}
                onPress={() => setNewFood(prev => ({ ...prev, unit }))}
              >
                <Text style={[
                  styles.unitButtonText,
                  newFood.unit === unit && styles.unitButtonTextSelected
                ]}>
                  {unit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Danh mục</Text>
          <View style={styles.pickerContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  newFood.category === category && styles.categoryButtonSelected
                ]}
                onPress={() => setNewFood(prev => ({ ...prev, category }))}
              >
                <Text style={[
                  styles.categoryButtonText,
                  newFood.category === category && styles.categoryButtonTextSelected
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[
              styles.addButton, 
              (!newFood.name.trim() || !newFood.price.trim()) && styles.addButtonDisabled
            ]} 
            onPress={addFood}
            disabled={!newFood.name.trim() || !newFood.price.trim()}
          >
            <Text style={styles.addButtonText}>Thêm Thực phẩm</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Food List */}
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
          </View>
        ) : (
          <FlatList
            data={memoizedFoods}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                colors={['#007AFF']}
              />
            }
            style={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không có thực phẩm nào</Text>
              </View>
            }
          />
        )}

        {/* Edit Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={cancelEditing}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sửa thực phẩm</Text>
              
              <Text style={styles.label}>Tên thực phẩm</Text>
              <TextInput
                style={styles.input}
                value={editFood.name}
                onChangeText={(text) => setEditFood(prev => ({ ...prev, name: text }))}
                placeholder="Nhập tên thực phẩm..."
              />

              <Text style={styles.label}>Giá</Text>
              <TextInput
                style={styles.input}
                value={editFood.price}
                onChangeText={(text) => setEditFood(prev => ({ ...prev, price: text }))}
                placeholder="Nhập giá thực phẩm..."
                keyboardType="numeric"
              />

              <Text style={styles.label}>Đơn vị</Text>
              <View style={styles.pickerContainer}>
                {units.map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    style={[
                      styles.unitButton,
                      editFood.unit === unit && styles.unitButtonSelected
                    ]}
                    onPress={() => setEditFood(prev => ({ ...prev, unit }))}
                  >
                    <Text style={[
                      styles.unitButtonText,
                      editFood.unit === unit && styles.unitButtonTextSelected
                    ]}>
                      {unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Danh mục</Text>
              <View style={styles.pickerContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      editFood.category === category && styles.categoryButtonSelected
                    ]}
                    onPress={() => setEditFood(prev => ({ ...prev, category }))}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      editFood.category === category && styles.categoryButtonTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={cancelEditing}
                >
                  <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button, 
                    styles.saveButton,
                    (!editFood.name.trim() || !editFood.price.trim()) && styles.saveButtonDisabled
                  ]}
                  onPress={updateFood}
                  disabled={!editFood.name.trim() || !editFood.price.trim()}
                >
                  <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  addForm: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxHeight: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  unitButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  unitButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  unitButtonText: {
    fontSize: 14,
    color: '#666',
  },
  unitButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  categoryButtonSelected: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  list: {
    flex: 1,
  },
  foodItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  foodInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  foodDetails: {
    flex: 1,
    marginRight: 12,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  foodPrice: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 4,
    fontWeight: '600',
  },
  foodCategory: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    minWidth: 60,
  },
  editBtn: {
    backgroundColor: '#FFA500',
  },
  deleteBtn: {
    backgroundColor: '#FF3B30',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  cancelButton: {
    backgroundColor: '#666',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '100%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default FoodManagerApp;