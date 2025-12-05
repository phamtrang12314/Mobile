import { View, Text, Pressable } from "react-native";
import styles from "../styles/styles";

export default function StudentItem({ student, onEdit, onDelete }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{student.maSV} - {student.hoTen}</Text>
      <View style={styles.row}>
        <Pressable style={styles.btnEdit} onPress={onEdit}>
          <Text style={styles.btnTextSmall}>Edit</Text>
        </Pressable>

        <Pressable style={styles.btnDelete} onPress={onDelete}>
          <Text style={styles.btnTextSmall}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}
