import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TableFooter, TablePagination, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function LibraryTableCompleted({ showCompleted, setShowCompleted }) {
  const initialData = [
    { id: 1, book: { id: '1', name: 'Book 1', author: 'Author 1', dateAdded: '2023-01-01' } },
    { id: 2, book: { id: '2', name: 'Book 2', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 3, book: { id: '3', name: 'Book 3', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 4, book: { id: '4', name: 'Book 4', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 5, book: { id: '5', name: 'Book 5', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 6, book: { id: '6', name: 'Book 6', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 7, book: { id: '7', name: 'Book 7', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 8, book: { id: '8', name: 'Book 8', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 9, book: { id: '9', name: 'Book 9', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 10, book: { id: '10', name: 'Book 10', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 11, book: { id: '11', name: 'Book 11', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 12, book: { id: '12', name: 'Book 12', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 13, book: { id: '13', name: 'Book 13', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 14, book: { id: '14', name: 'Book 14', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 15, book: { id: '15', name: 'Book 15', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 16, book: { id: '16', name: 'Book 16', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 17, book: { id: '17', name: 'Book 17', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 18, book: { id: '18', name: 'Book 18', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 19, book: { id: '19', name: 'Book 19', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 20, book: { id: '20', name: 'Book 20', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 21, book: { id: '21', name: 'Book 21', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 22, book: { id: '22', name: 'Book 22', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 23, book: { id: '23', name: 'Book 23', author: 'Author 2', dateAdded: '2023-01-02' } },
    { id: 24, book: { id: '24', name: 'Book 24', author: 'Author 2', dateAdded: '2023-01-02' } },
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

  const handleAdd = (bookData) => {
    const newId = data.length + 1;
    const bookEntry = {
      id: newId,
      book: {
        id: bookData.id,
        ...bookData
      }
    };

    setData(prevData => [...prevData, bookEntry]);
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* <button onClick={() => handleAdd({id: "25", name: 'Book 25', author: 'Author 2', dateAdded: '2023-01-02' })}>
        Add Book
      </button> */}
      <Table >
        <TableHead>
          <TableRow style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <TableCell style={{ flex: 1, textAlign: "center" }}>Book Name</TableCell>
            <TableCell style={{ flex: 1, textAlign: "center" }}>Author</TableCell>
            <TableCell style={{ flex: 1, textAlign: "center" }}>Date Added</TableCell>
            <TableCell style={{ flex: 1, textAlign: "center" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Box style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <Table style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <TableBody style={{ width: '100%' }}>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(entry => (
              <TableRow key={entry.id} style={{ display: 'flex', width: '100%', alignItems: "center" }}>
                <TableCell style={{ flex: 1, textAlign: "center" }}>{entry.book.name}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center" }}>{entry.book.author}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center" }}>{entry.book.dateAdded}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center" }}>
                  <Button
                    startIcon={<PlayArrowIcon />}
                    onClick={() => console.log(`Playing ${entry.book.name}`)}
                  >
                    Play
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="secondary"
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete
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

              <FormControl style={{ width: "130px" }}>
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
                style={{ marginRight: '1vw' }}
              />

            </div>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}






