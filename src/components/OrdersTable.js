import React, { useState, useEffect } from "react";
import "firebase/firestore";
import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openRowId, setOpenRowId] = useState(null);

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

  const handleRowClick = (id) => {
    setOpenRowId(openRowId === id ? null : id);
  };

  return (
    <div style={{ padding: "16px" }}>
      <Paper style={{ padding: "16px" }}>
        <TableContainer>
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
            <Table size="small" dense>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Full Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                  <React.Fragment key={order.id}>
                    <TableRow onClick={() => handleRowClick(order.id)}>
                      <TableCell>
                        <IconButton size="small">
                          {openRowId === order.id ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
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
                      <TableCell>{order.totalPrice} NOK</TableCell>
                      <TableCell>{order.date.toDate().toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={openRowId === order.id} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                              Items Ordered
                            </Typography>
                            {order.itemsBought.map((item) => (
                              <Typography key={item}>{item}</Typography>
                            ))}
                            <Typography variant="h6" gutterBottom component="div">
                              Total Price: {order.totalPrice} NOK
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
