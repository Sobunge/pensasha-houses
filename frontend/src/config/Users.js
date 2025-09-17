// src/config/users.js
export const users = [
  {
    id: 201, // landlord id matches properties
    name: "Benard Ayieko",
    role: "landlord",
    phone: "0707335378",
    email: "benard@gmail.com",
    password: "landlord123",
  },
  {
    id: 101, // tenant id matches properties
    name: "Shalom Ochieng",
    role: "tenant",
    phone: "0707335376",
    email: "shalom@gmail.com",
    password: "tenant123",
  },
  {
    id: 301, // caretaker id matches properties
    name: "Gift Pendo",
    role: "caretaker",
    phone: "0707335377",
    email: "gift@gmail.com",
    password: "caretaker123",
  },
  {
    id: 999, // admin can view all
    name: "Samuel Odhiambo",
    role: "admin",
    phone: "0707335375",
    email: "samuel@gmail.com",
    password: "admin123",
  },
];
