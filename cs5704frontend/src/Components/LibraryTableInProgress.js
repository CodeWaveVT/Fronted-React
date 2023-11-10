import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TableFooter, TablePagination, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const LibraryTableInProgress = forwardRef(({ showCompleted, setShowCompleted }, ref) => {
  
  const [data, setData] = useState([]);
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


  const getProcessingBooks = async () => {
    console.log("getting processing book");
    try {
      const response = await fetch('http://localhost:8080/api/task/list/test/processing', {
        method: 'POST',
        body: '',
      });

      const responseData = await response.json();

      if (response.ok) {
        // 检查 HTTP 状态代码是否指示成功（2xx）,因为后台的状态码不是用的标准版，而是多了两位，如20011，40001，所以需要取前三位
        const codePrefix = Math.floor(responseData.code / 100); // 计算代码的前三位
        console.log(codePrefix)
        if (codePrefix === 200) {
          // 如果代码以 200 开头，处理成功的情况
          console.log('Request was successful:', responseData);
          //setCompletedBook[responseData];
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

  useImperativeHandle(ref, () => ({
    childFunction() {
      getProcessingBooks();
    }
  }));

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
              <TableRow key={row.id} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <TableCell style={{ flex: 1, textAlign: "center", padding: "20px 16px 20px 16px" }}>{row.book.name}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center", padding: "20px 16px 20px 16px" }}>{row.book.author}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center", padding: "20px 16px 20px 16px" }}>{row.book.dateAdded}</TableCell>
                <TableCell style={{ flex: 1, textAlign: "center", padding: "11.5px 16px 11.5px 16px" }}>
                  <Button
                    variant="contained"
                    disableElevation
                    disabled
                    style={{
                      width: '12vw',
                      backgroundColor: row.book.status === 'processing' ? '#63C40A' :
                        row.book.status === 'in queue' ? 'orange' : '#FA5858',
                      color: 'black'
                    }}
                  >
                    {row.book.status.charAt(0).toUpperCase() + row.book.status.slice(1)}
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
            <TableCell>
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


export default LibraryTableInProgress;










