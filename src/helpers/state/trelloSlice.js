import api from "../api"
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const initialTaskState = {
    isFetching:false,
    errors:false,
    boardList:null,
    taskCount:0,
    taskList:null
}


export const fetchBoards = createAsyncThunk("userTasks", async(id,thunkApi) => {

    const response = await api.TaskAPI.fetchBoards();
    
    if(!!response.error){
		return thunkApi.rejectWithValue(response.error.error)
	}

	// const userTaskList = response.filter(word => word.length > 6);

    return {list:response}

})


const taskSlice = createSlice({
    name:"task",
    initialState:initialTaskState,
    reducers:{},
    extraReducers:{
        [fetchBoards.pending]: (state, action) => {
			state.isFetching = true
		},
		[fetchBoards.fulfilled]: (state, action) => {
			state.isFetching = false
			state.boardList = action.payload.list
			state.taskCount = action.payload.list.length
			state.error = null
		},
		[fetchBoards.rejected]: (state, action) => {
			state.isFetching = false
			state.error = action.payload || action.error
		}
    }
})

export default taskSlice.reducer