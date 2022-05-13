import React, {useEffect , useCallback} from 'react'
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from '../../pages/Login'
import SignUp from '../../pages/SignUp'
import api from '../../helpers/api'
import { fetchLoggedUser, logout } from '../../helpers/state/authSlice'
import Home from './Home'
export default function Index() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    getToken()
}, [dispatch])

const getToken = async () => {
  try {
    const token = await window.localStorage.getItem("app-jwt-token")
    if(token){
      dispatch(fetchLoggedUser(token))
    }
    api.setLogoutFn(()=> dispatch(logout()));    
  } catch (error) {
    
  }
};

const logoutHandler = useCallback(() => {
  dispatch(logout());
  window.location.pathname = "/"
}, [dispatch]);


const user = useSelector((state) => state.auth.loggedUser, shallowEqual);

  return (
    		<Router>
			<div className="App">
        {console.log("local: ", localStorage.getItem("app-jwt-token")? "true": "false")}
				<Routes>
        <Route exact path="*" element={!!user ? <Home logout={logoutHandler} user={user} /> : <Login />}/>
        <Route exact path="/signUp" element={<SignUp/>}/>
				</Routes>
			</div>
		</Router>
  )
}
