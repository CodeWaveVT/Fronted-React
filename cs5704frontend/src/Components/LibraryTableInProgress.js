import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TableFooter, TablePagination, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { v4 as uuidv4 } from 'uuid';
import emptyImage from '../assets/images/empty_box.png';

const LibraryTableInProgress = forwardRef(({ showCompleted, setShowCompleted }, ref) => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fetched, setFetched] = useState(false);

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

  const formatDate = (dateString) => {
    return dateString.split("T")[0];
  };

  const getProcessingBooks = async () => {
    console.log("getting processing book");
    try {
      const response = await fetch('/api/task/list/processing', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json', // Set the Content-Type header
        // },
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
              dateAdded: formatDate(item.createTime),
              url: item.bookUrl,
              status: item.status
            };

            if (dataItem.status !== "success") {
              handleAdd(dataItem);
            }
          }
          setFetched(true);
        }
        else {
          console.error('Something went wrong:', responseData);
          setFetched(true);
        }
      }
      else {
        throw new Error(`Bad response from server: ${response.status}`);
        setFetched(true);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setFetched(true);
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
            <TableCell style={{ flex: 2, textAlign: "center" }}>Status</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Box style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        {data.length === 0 && fetched? (
          <>
            <div style={{ textAlign: 'center', marginTop: '10vh' }}>
              <img src={emptyImage} alt="No Data" className="responsive-image"/>
              <div style={{ marginTop: '2vh', fontWeight: 'bold', fontSize: '16px', opacity: '0.7'}}>It's quieter than a library in here. Let's get the ball rolling!</div>
            </div>
          </>
        ) : (
          <Table style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TableBody style={{ width: '100%' }}>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                  <TableCell style={{ flex: 1, textAlign: "center", padding: "30px 16px 30px 16px" }}>{row.book.name}</TableCell>
                  <TableCell style={{ flex: 1, textAlign: "center", padding: "30px 16px 30px 16px" }}>{row.book.author}</TableCell>
                  <TableCell style={{ flex: 1, textAlign: "center", padding: "30px 16px 30px 16px" }}>{row.book.dateAdded}</TableCell>
                  <TableCell style={{ flex: 2, textAlign: "center", padding: "21.5px 16px 21.5px 16px" }}>
                    <Button
                      variant="contained"
                      disableElevation
                      disabled
                      style={{
                        width: '12vw',
                        backgroundColor: row.book.status === 'running' ? '#63C40A' :
                          row.book.status === 'waiting' ? 'orange' : '#FA5858',
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
        )}
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
                    onClick={getProcessingBooks}
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










