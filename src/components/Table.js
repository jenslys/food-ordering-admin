import React, { useState, useEffect } from "react";
import "firebase/firestore";
import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
  Link
} from "@mui/material";

export default function CustomTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const q = query(collection(db, "orders"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}>
          <CircularProgress />
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Items Ordered</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {order.firstName} {order.lastName}
                </TableCell>
                <TableCell>{order.phoneNumber}</TableCell>
                <TableCell>
                  <Link
                    href={`https://maps.google.com/?q=${order.address}, ${order.city}, ${order.zipCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover">
                    {order.address}, {order.city}, {order.zipCode}
                  </Link>
                </TableCell>
                <TableCell>{order.itemsBought.join(", ")}</TableCell>
                <TableCell>{order.totalPrice} NOK</TableCell>
                <TableCell>{order.date.toDate().toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
