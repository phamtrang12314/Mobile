import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/students";

export const getStudents = createAsyncThunk("students/getAll", api.getAll);
export const addStudent = createAsyncThunk("students/add", api.add);
export const updateStudent = createAsyncThunk("students/update", api.update);
export const deleteStudent = createAsyncThunk("students/delete", api.delete);

const studentSlice = createSlice({
  name: "students",
  initialState: { students: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(s => s.maSV === action.payload.maSV);
        if (index !== -1) state.students[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(s => s.maSV !== action.meta.arg);
      });
  }
});

export default studentSlice.reducer;
