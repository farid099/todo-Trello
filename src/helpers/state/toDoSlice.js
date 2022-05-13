import api from "../api"
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'

const initialToDoState = {
    isFetching:false,
    errors:false,
    toDoList:null,
    toDoCount:0,
    toDo:null
}


export const fetchUserToDo = createAsyncThunk("userToDos", async(id,thunkApi) => {

    const response = await api.ToDoAPI.fetchUserToDoList(id);
    
    if(!!response.error){
		return thunkApi.rejectWithValue(response.error.error)
	}
    return {list:response}

})

export const createTodo = createAsyncThunk("todo/create", async(data,thunkApi)=>{

    const response = await api.ToDoAPI.createToDo(data)

    if(!!response.error){
        return thunkApi.rejectWithValue(response.error.error)
    }

    return {list:response}
})

export const deleteTodo = createAsyncThunk("todo/delete", async(id,thunkApi)=>{

	console.log(id)
    const response = await api.ToDoAPI.deleteToDo(id)
    if(!!response.error){
        return thunkApi.rejectWithValue(response.error.error)
    }

    return id
})


export const updateTodo = createAsyncThunk("todo/update", async(data,thunkApi)=>{

	// thunkApi.dispatch(deleteTodo(data.id))
	// thunkApi.dispatch(createTodo(data))

    return {list:null}
})


const toDoSlice = createSlice({
    name:"toDo",
    initialState:initialToDoState,
    reducers:{},
    extraReducers:{
        [fetchUserToDo.pending]: (state, action) => {
			state.isFetching = true
		},
		[fetchUserToDo.fulfilled]: (state, action) => {
			state.isFetching = false
			state.toDoList = action.payload.list
			state.toDoCount = action.payload.list.length
			state.error = null
		},
		[fetchUserToDo.rejected]: (state, action) => {
			state.isFetching = false
			state.error = action.payload || action.error
		},
        [createTodo.pending]: (state, action) => {
			state.isFetching = true
		},
		[createTodo.fulfilled]: (state, action) => {
			state.isFetching = false
			state.toDoList = [...state.toDoList,action.payload.list]
			state.error = null
		},
		[createTodo.rejected]: (state, action) => {
			state.isFetching = false
			state.error = action.payload || action.error
		},
        [deleteTodo.pending]: (state, action) => {
			state.isFetching = true
		},
		[deleteTodo.fulfilled]: (state, action) => {
			state.isFetching = false
            const newToDolist = state.toDoList.filter(i => i.id !== action.payload);
			state.toDoList = newToDolist
			state.error = null
		},
		[deleteTodo.rejected]: (state, action) => {
			state.isFetching = false
			state.error = action.payload || action.error
		},
    }
})

export default toDoSlice.reducer