import api from "../api"
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const initialJobState = {
    isFetching:false,
    errors:false,
    jobList:null,
    jobCount:0,
    job:null
}



export const fetchJobList = createAsyncThunk("jobs", async(thunkApi) => {

    const response = await api.JobAPI.fetchJobList();
    console.log(response.length)
    if(!!response.error){
		return thunkApi.rejectWithValue(response.error.error)
	}
    return {list:response}

})

export const fetchUserJob = createAsyncThunk("userjobs", async(id,thunkApi) => {

    const response = await api.JobAPI.fetchJobList(id);

    console.log(response)
    
    if(!!response.error){
		return thunkApi.rejectWithValue(response.error.error)
	}
    return {list:response}

})


const jobSlice = createSlice({
    name:"job",
    initialState:initialJobState,
    reducers:{},
    extraReducers:{
        [fetchJobList.pending]: (state, action) => {
			state.isFetching = true
		},
		[fetchJobList.fulfilled]: (state, action) => {
			state.isFetching = false
			state.jobList = action.payload.list
			state.jobCount = action.payload.list.length
			state.error = null
		},
		[fetchJobList.rejected]: (state, action) => {
			state.isFetching = false
			state.error = action.payload || action.error
		},
    }
})

export default jobSlice.reducer