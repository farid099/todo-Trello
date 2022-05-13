import React, {useCallback, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createTodo, updateTodo } from '../../helpers/state/toDoSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit"


const validationSchema = yup.object({
    title:yup
    .string("Enter title")
    .required("Title is required"),
    content:yup
    .string("Enter content")
    .required("Content is required")
})

export default function FormDialog({open,handleClose,user_id,toDo}) {

    const dispatch = useDispatch()
     function getCurrentDate(separator='-'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        }

    const formik = useFormik({
        initialValues: {
          title: '',
          content: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleClose()
            if (!toDo) {
               const  data = {title:values.title,content:values.content, user_id:user_id ,date:getCurrentDate()}
               addTodo(data)
            }else{
               const  data = {title:values.title,content:values.content, user_id:user_id, id:toDo.id ,date:getCurrentDate()}
               updateTodoHandler(data)
            }

        },
      });

      useEffect(()=>{
          if (!!toDo) {
            formik.setValues({"title":toDo.title,"content":toDo.content});
          }
    }, [open])
      


      const handleClosefunction = () =>{
        if (!toDo) {
            formik.resetForm();
        }
        handleClose()
      }

      const addTodo = useCallback(
        (values) => {

                dispatch(createTodo(values))
                .then(unwrapResult)
                .then((result) => console.log("creating todo success"),         
                   formik.resetForm()

                )
                .catch(error =>{
                });

        },
        [dispatch]
    )

    const updateTodoHandler = useCallback(
        (values) => {

                dispatch(updateTodo(values))
                .then(unwrapResult)
                .then((result) => console.log("update todo success")
                )
                .catch(error =>{
                });

        },
        [dispatch]
    )

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Creating new note</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name='title'
            id="Title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}  
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            id="Content"
            multiline
            name='content'
            rows={2}
            label="Content"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}  
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosefunction}>Cancel</Button>
          <Button type='submit'>Submit</Button>
        </DialogActions>
        </form>

      </Dialog>
    </div>
  );
}
