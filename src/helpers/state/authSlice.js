import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'

const initialAuthState = {
    isLoading: false,
    token:null,
    loggedUser:null,
    userJobName:null,
    error:null
}

export const loginAsync = createAsyncThunk("users/login",async({email,password},thunkApi)=>{

    const response = await api.AuthAPI.login()
  
    let user = response.find(data => data.email === email);
    if(user == undefined){
     return thunkApi.rejectWithValue("bele bir user yoxdur")
    }
    if(user.password != password){
        return thunkApi.rejectWithValue("sifre yanlisdir")
    }
    window.localStorage.setItem('app-jwt-token', user.token)

    return user
})

export const signupAsync = createAsyncThunk("users/signup",async(data,thunkApi)=>{

    const {email, password ,jobId} = data
    const token = email+"token"
    const user = {email, password ,jobId ,token}

    console.log(user)

    const response = await api.AuthAPI.register(user)
    if(!!response.error){
        return thunkApi.rejectWithValue(response.error)
    }
    return response
})


export const fetchLoggedUser = createAsyncThunk("user",async(token,thunkApi)=>{

    const response = await api.AuthAPI.fetchUser()
  
    let user = response.find(data => data.token === token);
    if(user == undefined){
     return thunkApi.rejectWithValue("bele bir user yoxdur")
    }
    const job = await api.JobAPI.fetchUserjob(user.jobId);

    return { user : user , jobName : job.name }
})

const authSlice = createSlice({
    name:"auth",    
    initialState:initialAuthState,
    reducers:{
        logout(state,action){
            state.isLoading = initialAuthState.isLoading
            state.loggedUser = initialAuthState.loggedUser
            state.userJobName = initialAuthState.userJobName
            state.token = initialAuthState.token
            state.error = initialAuthState.error
            window.localStorage.setItem("app-jwt-token", "")
                }
    },
    extraReducers:{
        [loginAsync.pending]: (state, action) => {
			state.isLoading = true
		},
		[loginAsync.fulfilled]: (state, action) => {
			state.isLoading = false
			state.token = action.payload.token
			state.loggedUser = action.payload
            state.userJobName = null
			state.error = null
		},
		[loginAsync.rejected]: (state, action) => {
			state.isLoading = false
			state.error = action.payload || action.error
		},
        [fetchLoggedUser.pending]: (state, action) => {
            console.log("pending")
			state.isLoading = true
		},
		[fetchLoggedUser.fulfilled]: (state, action) => {
            console.log("full")

			state.isLoading = false
			state.token = action.payload.user.token
			state.loggedUser = action.payload.user
            state.userJobName = action.payload.jobName
			state.error = null

		},
		[fetchLoggedUser.rejected]: (state, action) => {
			state.isLoading = false
			state.error = action.payload || action.error
		},
        [signupAsync.pending]: (state, action) => {
			state.isLoading = true
		},
		[signupAsync.fulfilled]: (state, action) => {
			state.isLoading = false
			state.token = action.payload.token
			state.loggedUser = action.payload
            state.userJobName = null
			state.error = null
		},
		[signupAsync.rejected]: (state, action) => {
			state.isLoading = false
			state.error = action.payload || action.error
		},
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer