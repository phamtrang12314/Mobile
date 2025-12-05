import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { addStudent } from "../src/redux/studentSlice";
import { useRouter } from "expo-router";
import styles from "../src/styles/styles";

export default function Add() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ maSV: "", hoTen: "", ngaySinh: "", lop: "" });

  const handleAdd = () => {
    if (!form.maSV || !form.hoTen) return alert("Vui lòng nhập đủ thông tin!");
    dispatch(addStudent(form));
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Student</Text>

      {["maSV","hoTen","ngaySinh","lop"].map((field) => (
        <TextInput
          key={field}
          placeholder={field}
          style={styles.input}
          value={form[field]}
          onChangeText={(t) => setForm({ ...form, [field]: t })}
        />
      ))}

      <Pressable style={styles.btnSave} onPress={handleAdd}>
        <Text style={styles.btnText}>Save</Text>
      </Pressable>
    </View>
  );
}
