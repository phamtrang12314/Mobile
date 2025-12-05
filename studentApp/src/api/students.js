let students = [
  { maSV: "SV01", hoTen: "Nguyen Van A", ngaySinh: "01/01/2000", lop: "CNTT1" },
  { maSV: "SV02", hoTen: "Tran Thi B", ngaySinh: "02/02/2001", lop: "CNTT2" },
];

export const api = {
  getAll: async () => students,

  add: async (sv) => {
    students.push(sv);
    return sv;
  },

  update: async (sv) => {
    const index = students.findIndex(s => s.maSV === sv.maSV);
    if (index !== -1) students[index] = sv;
    return sv;
  },

  delete: async (id) => {
    students = students.filter(s => s.maSV !== id);
    return true;
  }
};
