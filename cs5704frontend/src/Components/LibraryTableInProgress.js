import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TableFooter, TablePagination, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function LibraryTableInProgress({ showCompleted, setShowCompleted }) {
  const initialData = [
    { id: 1, bookName: 'Book 1', author: 'Author 1', dateAdded: '2023-01-01', status: 'in progress' },
    { id: 2, bookName: 'Book 2', author: 'Author 2', dateAdded: '2023-01-02', status: 'in queue' },
    { id: 3, bookName: 'Book 3', author: 'Author 3', dateAdded: '2023-01-03', status: 'failed' },
  ];

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleDelete = (id) => {
    const updatedData = data.filter(row => row.id !== id);
    setData(updatedData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleTableChange = (event) => {
    setShowCompleted(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <Table >
        <TableHead>
          <TableRow style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <TableCell style={{ flex: 1, textAlign: "center" }}>Book Name</TableCell>
            <TableCell style={{ flex: 1, textAlign: "center" }}>Author</TableCell>
            <TableCell style={{ flex: 1, textAlign: "center" }}>Date Added</TableCell>
            <TableCell style={{ flex: 1, textAlign: "center" }}>Status</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Box style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <Table style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <TableBody style={{ width: '100%' }}>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow key={row.id} style={{ display: 'flex', width: '100%' }}>
                <TableCell style={{ flex: 1, textAlign: "center" }}>{row.bookName}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center" }}>{row.author}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center" }}>{row.dateAdded}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    disableElevation
                    disabled
                    style={{
                      width: '12vw',
                      backgroundColor: row.status === 'in progress' ? '#63C40A' :
                        row.status === 'in queue' ? 'orange' : '#FA5858',
                      color: 'black'
                    }}
                  >
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Table style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#f6f6f6', zIndex: 10 }}>
        <TableFooter >
          <TableRow >
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '95%', marginBottom: '3vh', marginTop: '3vh' }}>

              <FormControl style={{ width: "150px" }}>
                <InputLabel id="select-table">Status</InputLabel>
                <Select
                  labelId="select-table"
                  id="simple-select"
                  value={showCompleted}
                  label="Age"
                  onChange={handleTableChange}
                >
                  <MenuItem value={true}>Completed</MenuItem>
                  <MenuItem value={false}>In Progress</MenuItem>
                </Select>
              </FormControl>

              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ marginRight: '1vw' }} // Adjust this as needed
              />

            </div>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}













