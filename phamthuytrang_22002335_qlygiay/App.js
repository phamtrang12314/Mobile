import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Sửa lỗi import: Đảm bảo đường dẫn đúng, không có dấu cách thừa
import ShoeListScreen from './components/ShoeListScreen';
import AddShoeScreen from './components/AddShoeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ShoeList">
          <Stack.Screen 
            name="ShoeList" 
            component={ShoeListScreen}
            options={{ title: 'Quản lý bán giày' }}
          />
          <Stack.Screen 
            name="AddShoe" 
            component={AddShoeScreen}
            options={{ title: 'Thêm sản phẩm mới' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}