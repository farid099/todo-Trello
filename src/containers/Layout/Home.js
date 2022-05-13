import React from 'react'
import Drawer from '../../components/Drawer/Drawer'
import { Routes, Route } from "react-router-dom"
import Dashboard from '../../pages/DragDrop/Index'
import ToDo from '../../pages/Todo/ToDo'
import Trello from '../../pages/Trello/Trello'


function Home({user,logout}) {

  return (
    <>
    					<Routes>
						<Route path="/"  element={<Drawer user={user} logout={logout} children={<Dashboard user={user}/>}/>}/>
            <Route path="/todo"  element={<Drawer user={user} logout={logout} children={<ToDo user={user}/>}/>}/>
            <Route path="/trello"  element={<Drawer user={user} logout={logout} children={<Trello user={user}/>}/>}/>

					</Routes>
    </>
  )
}

export default Home