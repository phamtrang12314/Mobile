import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6
  },
  btnAdd: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10
  },
  btnSave: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 6
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18
  },
  item: {
    padding: 15,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 6
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5
  },
  row: { flexDirection: "row", gap: 10 },
  btnEdit: { backgroundColor: "orange", padding: 8, borderRadius: 5 },
  btnDelete: { backgroundColor: "red", padding: 8, borderRadius: 5 },
  btnTextSmall: { color: "#fff" }
});
