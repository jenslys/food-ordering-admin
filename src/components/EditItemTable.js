import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button
} from "@mui/material";

export default function EditItemTable() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "pizza"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleEdit = (id, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(updatedItems);
    const docRef = doc(db, "pizza", id);
    updateDoc(docRef, { [field]: value });
  };

  const handleAddItem = async () => {
    const newItem = { imagePath: "", itemName: "", price: 0 }; // Define new item structure
    const docRef = await addDoc(collection(db, "pizza"), newItem); // Add new item to the collection
    setItems([...items, { id: docRef.id, ...newItem }]); // Update state with the new item
  };

  const handleDeleteItem = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    const docRef = doc(db, "pizza", id);
    await deleteDoc(docRef);
  };

  return (
    <TableContainer component={Box}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <TextField
                  value={item.imagePath}
                  onChange={(e) => handleEdit(item.id, "imagePath", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={item.itemName}
                  onChange={(e) => handleEdit(item.id, "itemName", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={item.price}
                  onChange={(e) => handleEdit(item.id, "price", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteItem(item.id)}>Delete</Button>{" "}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4}>
              <Button onClick={handleAddItem}>Add New Item</Button> {/* Button to add a new item */}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
