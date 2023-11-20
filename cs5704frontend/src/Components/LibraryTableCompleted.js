import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TableFooter, TablePagination, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ConfirmDelete from './ConfirmDelete';
import { v4 as uuidv4 } from 'uuid';

const LibraryTableCompleted = forwardRef(({ showCompleted, setShowCompleted }, ref) => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [idToBeDeleted, setIdTobeDelete] = useState(-1);

  const handleDelete = (id) => {
    setIdTobeDelete(id);
    setOpenConfirmDelete(true);
  };

  const handleConfirmDeleteClose = async (confirm) => {
    setOpenConfirmDelete(false);
    if (confirm) {
      const rowToDelete = data.find(row => row.id === idToBeDeleted);
      if (rowToDelete.book.id) {
        await handleDeleteBook(rowToDelete.book.id);
      }
      setData(data.filter(row => row.id !== idToBeDeleted));
    }
  }

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

  const handleDeleteBook = async (taskId) => {
    console.log("deleting book with task ID:", taskId);
    try {
      const encodedBody = new URLSearchParams();
      encodedBody.append('taskId', taskId);

      const response = await fetch('/api/task/delete/completed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodedBody,
      });

      const responseData = await response.json();

      if (response.ok) {
        const codePrefix = Math.floor(responseData.code / 100);
        console.log('Response code prefix:', codePrefix);
        if (codePrefix === 200) {
          console.log('Request was successful:', responseData);
        } else {
          console.error('Something went wrong:', responseData);
        }
      } else {
        throw new Error(`Bad response from server: ${response.status}`);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const getCompletedBooks = async () => {
    console.log("getting completed book");
    try {
      const response = await fetch('/api/task/list/completed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header
        },
        body: JSON.stringify({}), // Use JSON.stringify to send an empty JSON object
        credentials: 'include',
      });

      const responseData = await response.json();

      if (response.ok) {
        // 检查 HTTP 状态代码是否指示成功（2xx）,因为后台的状态码不是用的标准版，而是多了两位，如20011，40001，所以需要取前三位
        const codePrefix = Math.floor(responseData.code / 100); // 计算代码的前三位
        console.log(codePrefix)
        if (codePrefix === 200) {
          // 如果代码以 200 开头，处理成功的情况
          console.log('Request was successful:', responseData);

          for (let i = 0; i < responseData.data.length; i++) {
            const item = responseData.data[i];
            //console.log(item.bookUrl);
            //console.log(i);
            const dataItem = {
              id: item.taskId,
              name: item.bookName,
              author: item.author,
              dateAdded: item.createTime,
              url: item.bookUrl,
            };

            handleAdd(dataItem);
          }

        }
        else {
          console.error('Something went wrong:', responseData);
        }
      }
      else {
        throw new Error(`Bad response from server: ${response.status}`);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  const handleAdd = (bookData) => {
    setData(prevData => {
      const exists = prevData.some(entry => entry.book.id === bookData.id);

      if (!exists) {
        return [...prevData, { id: uuidv4(), book: bookData }];
      }
      else {
        return prevData;
      }
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handlePlay = (bookUrl) => {
    console.log(bookUrl);
    window.open(bookUrl, '_blank', 'width=350, height=180');
  }

  useImperativeHandle(ref, () => ({
    childFunction() {
      getCompletedBooks();
    }
  }));

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* <button onClick={() => handleAdd({id: "25", name: 'Book 25', author: 'Author 2', dateAdded: '2023-01-02' })}>
        Add Book
      </button> */}
      <ConfirmDelete
        open={openConfirmDelete}
        handleClose={handleConfirmDeleteClose}
        style={{ zIndex: '12' }}
      />
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
              <TableRow key={entry.id} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <TableCell style={{ flex: 1, textAlign: "center", padding: "20px 16px 20px 16px" }}>{entry.book.name}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center", padding: "20px 16px 20px 16px" }}>{entry.book.author}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center", padding: "20px 16px 20px 16px" }}>{entry.book.dateAdded}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center", padding: "11.5px 16px 11.5px 16px" }}>
                  <Button
                    startIcon={<PlayArrowIcon />}
                    onClick={() => handlePlay(entry.book.url)}
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
            <TableCell style={{ padding: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '95%', marginBottom: '3vh', marginTop: '3vh' }}>

                <FormControl style={{ width: "130px" }}>
                  <InputLabel id="select-table">Status</InputLabel>
                  <Select
                    labelId="select-table"
                    id="simple-select"
                    value={showCompleted}
                    label="Age"
                    onChange={handleTableChange}
                    onClick={getCompletedBooks}
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
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
});


export default LibraryTableCompleted;



// const initialData = [];

// const initialData = [
//   { id: 1, book: { id: '1', name: 'Book 1', author: 'Author 1', dateAdded: '01/01/23' } },
//   { id: 2, book: { id: '2', name: 'Book 2', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 3, book: { id: '3', name: 'Book 3', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 4, book: { id: '4', name: 'Book 4', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 5, book: { id: '5', name: 'Book 5', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 6, book: { id: '6', name: 'Book 6', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 7, book: { id: '7', name: 'Book 7', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 8, book: { id: '8', name: 'Book 8', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 9, book: { id: '9', name: 'Book 9', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 10, book: { id: '10', name: 'Book 10', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 11, book: { id: '11', name: 'Book 11', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 12, book: { id: '12', name: 'Book 12', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 13, book: { id: '13', name: 'Book 13', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 14, book: { id: '14', name: 'Book 14', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 15, book: { id: '15', name: 'Book 15', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 16, book: { id: '16', name: 'Book 16', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 17, book: { id: '17', name: 'Book 17', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 18, book: { id: '18', name: 'Book 18', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 19, book: { id: '19', name: 'Book 19', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 20, book: { id: '20', name: 'Book 20', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 21, book: { id: '21', name: 'Book 21', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 22, book: { id: '22', name: 'Book 22', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 23, book: { id: '23', name: 'Book 23', author: 'Author 2', dateAdded: '01/01/23' } },
//   { id: 24, book: { id: '24', name: 'Book 24', author: 'Author 2', dateAdded: '01/01/23' } },
// ];