const API_URL = 'https://68ccd335da4697a7f303ad61.mockapi.io/shoe';

// Mock data ban đầu để test khi API không hoạt động
let mockShoes = [
  {
    id: '1',
    productCode: 'GI001',
    productName: 'Giày thể thao nam Nike Air Max',
    size: 'L',
    price: '450000',
    quantity: '10',
    description: 'Giày thể thao cao cấp'
  },
  {
    id: '2',
    productCode: 'GI002',
    productName: 'Giày chạy bộ Adidas Ultraboost',
    size: 'M',
    price: '320000',
    quantity: '15',
    description: 'Giày chạy bộ êm ái'
  }
];

export const shoeService = {
  // GET all shoes
  getAllShoes: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return {
        data: data,
        status: 200
      };
    } catch (error) {
      console.error('Error fetching shoes, using mock data:', error);
      // Return mock data nếu API fail
      return {
        data: mockShoes,
        status: 200
      };
    }
  },

  // CREATE new shoe
  createShoe: async (shoeData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoeData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const newShoe = await response.json();
      
      // Thêm vào mock data
      mockShoes.push(newShoe);
      
      return {
        data: newShoe,
        status: 201
      };
    } catch (error) {
      console.error('Error creating shoe, using mock data:', error);
      // Tạo mock data nếu API fail
      const newShoe = {
        ...shoeData,
        id: Date.now().toString(),
      };
      mockShoes.push(newShoe);
      return {
        data: newShoe,
        status: 201
      };
    }
  },

  // UPDATE shoe
  updateShoe: async (id, shoeData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoeData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const updatedShoe = await response.json();
      
      // Cập nhật mock data
      const index = mockShoes.findIndex(item => item.id === id);
      if (index !== -1) {
        mockShoes[index] = updatedShoe;
      }
      
      return {
        data: updatedShoe,
        status: 200
      };
    } catch (error) {
      console.error('Error updating shoe, using mock data:', error);
      // Cập nhật mock data nếu API fail
      const index = mockShoes.findIndex(item => item.id === id);
      if (index !== -1) {
        mockShoes[index] = { ...mockShoes[index], ...shoeData };
        return {
          data: mockShoes[index],
          status: 200
        };
      }
      return {
        data: null,
        status: 404
      };
    }
  },

  // DELETE shoe
  deleteShoe: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Xóa khỏi mock data
      mockShoes = mockShoes.filter(item => item.id !== id);
      
      return {
        data: { message: 'Xóa thành công' },
        status: 200
      };
    } catch (error) {
      console.error('Error deleting shoe, using mock data:', error);
      // Xóa khỏi mock data nếu API fail
      mockShoes = mockShoes.filter(item => item.id !== id);
      return {
        data: { message: 'Xóa thành công' },
        status: 200
      };
    }
  }
};