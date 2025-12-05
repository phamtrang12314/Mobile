import { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, RefreshControl, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { getStudents, deleteStudent } from "../src/redux/studentSlice";
import StudentItem from "../src/components/StudentItem";
import styles from "../src/styles/styles";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { students } = useSelector(state => state.students);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getStudents());
    setTimeout(() => setRefreshing(false), 700);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Manager App</Text>

      <Pressable style={styles.btnAdd} onPress={() => router.push("/add")}>
        <Text style={styles.btnText}>+ Add Student</Text>
      </Pressable>

      <FlatList
        data={students}
        keyExtractor={item => item.maSV.toString()}
        renderItem={({ item }) => (
          <StudentItem
            student={item}
            onEdit={() => router.push({ pathname: "/edit", params: item })}
            onDelete={() => dispatch(deleteStudent(item.maSV))}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
