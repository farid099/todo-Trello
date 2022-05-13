import React, {useCallback, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit"
import { deleteTodo } from '../../helpers/state/toDoSlice';


export default function AlertDialog({open, toDo, handleClose}) {

    const dispatch = useDispatch();

    const deleteTodoHandler = useCallback(
        (toDo) => {

            console.log(toDo)
                dispatch(deleteTodo(toDo.id))
                .then(unwrapResult)
                .then((result) => 
                console.log("deleting todo success"),
                handleClose()
                )
                .catch(error =>{
                });

        },
        [dispatch]
    )
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Are you sure to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={()=>deleteTodoHandler(toDo)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
