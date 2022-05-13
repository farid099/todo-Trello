import api from "../api"
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const initialToDoState = {
    isFetching:false,
    errors:false,
    toDoList:null,
    toDoCount:0,
    toDo:null
}


export const fetchBoards = createAsyncThunk("boards", async(id,thunkApi) => {

    const response = await api.TaskAPI.fetchToDoBoards();
    
    if(!!response.error){
		return thunkApi.rejectWithValue(response.error.error)
	}

    return {list:response}

})


const toDoSliceNew = createSlice({
    name:"toDo",
    initialState:initialToDoState,
    reducers:{},
    extraReducers:{
        [fetchBoards.pending]: (state, action) => {
			state.isFetching = true
		},
		[fetchBoards.fulfilled]: (state, action) => {
			state.isFetching = false
			state.toDoList = action.payload.list
			state.toDoCount = action.payload.list.length
			state.error = null
		},
		[fetchBoards.rejected]: (state, action) => {
			state.isFetching = false
			state.error = action.payload || action.error
		}
    }
})

export default toDoSliceNew.reducer