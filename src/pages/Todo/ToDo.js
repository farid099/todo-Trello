import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchUserToDo } from '../../helpers/state/toDoSlice'
import ToDoTable from './ToDoTable'
import Button from '@mui/material/Button';
import { Box } from '@mui/material'
import FormDialog from '../../components/Dialog/FormDialog'


export default function ToDo({user}) {

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);

  const toDoList =useSelector((state) => state.toDo.toDoList, shallowEqual);
  const toDoCount =useSelector((state) => state.toDo.toDoCount, shallowEqual);

  const handleClickOpen = () =>{
    setOpen(true);
  }

  const handleClose = () =>{
    setOpen(false);
  }

  useEffect(()=>{
    dispatch(fetchUserToDo(user.id))
  }, [dispatch])

  return (
    <div>
      <Box sx={{ my: 3 }} >  
          <Button  variant="contained" onClick={handleClickOpen}>+ Add new</Button>
          <FormDialog open={open} handleClose={handleClose} user_id={user.id} />
      </Box>
      <ToDoTable toDoList={toDoList} user_id={user.id}></ToDoTable>
      </div>
  )
}
