import { combineReducers } from "@reduxjs/toolkit"
import jobReducer from "./jobSlice"
import authReducer from "./authSlice"
import toDoReducer from "./toDoSlice"
import toDoReducerNew from "./toDoSliceNew"
import boardReducer from "./trelloSlice"

//combine all reducers here
const rootReducer = combineReducers({
	job: jobReducer,
	auth:authReducer,
	toDo:toDoReducer,
	toDoNew:toDoReducerNew,
	board:boardReducer
})

export default rootReducer