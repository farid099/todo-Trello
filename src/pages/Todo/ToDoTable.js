import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormDialog from '../../components/Dialog/FormDialog'
import AlertDialog from '../../components/Dialog/AlertDialog';



export default function DenseTable({toDoList,user_id}) {

  const [open, setOpen] = useState(false);
  const [toDo , setToDO] = useState()

  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpenAlert = (todo) => {
    setOpenAlert(true);
    setToDO(todo)

  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClickOpen = (todo) =>{
    setOpen(true);
    setToDO(todo)
  }

  const handleClose = () =>{
    setOpen(false);
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell  style={{ fontWeight: 600 }}>Title</TableCell>
            <TableCell  style={{ fontWeight: 600 }}>Content</TableCell>
            <TableCell  style={{ fontWeight: 600 }}>Date</TableCell>
            <TableCell  style={{ fontWeight: 600 }}>Edit</TableCell>
            <TableCell  style={{ fontWeight: 600 }}>Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {!! toDoList && toDoList.map((toDo) => (
            <TableRow
              key={toDo.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >{toDo.title}</TableCell>
              <TableCell >{toDo.content}</TableCell>
              <TableCell >{toDo.date}</TableCell>
              <TableCell ><Button color="success"  variant="contained" onClick={()=>handleClickOpen(toDo)}>Edit</Button></TableCell>
              <TableCell ><Button color="error" variant="contained" onClick={()=>handleClickOpenAlert(toDo)}>Delete</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <FormDialog open={open} handleClose={handleClose} toDo={toDo} user_id={user_id}/>
    <AlertDialog open={openAlert} toDo={toDo} handleClose={handleCloseAlert} />

    </>
  );
}
