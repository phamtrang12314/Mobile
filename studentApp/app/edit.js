import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { updateStudent } from "../src/redux/studentSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import styles from "../src/styles/styles";

export default function Edit() {
  const router = useRouter();
  const student = useLocalSearchParams();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    maSV: student.maSV,
    hoTen: student.hoTen,
    ngaySinh: student.ngaySinh,
    lop: student.lop,
  });

  const handleUpdate = () => {
    dispatch(updateStudent(form));
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Student</Text>

      {["maSV","hoTen","ngaySinh","lop"].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          value={form[field]}
          onChangeText={(t) => setForm({ ...form, [field]: t })}
        />
      ))}

      <Pressable style={styles.btnSave} onPress={handleUpdate}>
        <Text style={styles.btnText}>Save Changes</Text>
      </Pressable>
    </View>
  );
}
