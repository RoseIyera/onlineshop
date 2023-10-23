import React from  'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Products from './products';
import Orders from './components/Orders'
import AdminPanel from './components/AdminPanel'

export default function RouterPage(){
    
    return(
        <Router>
            <Routes>
                <Route exact path='/' element={ <Landing /> } />
                <Route path='/product' element={ <Products /> } />
                <Route path='/orders' element={ <Orders /> } />
                <Route path='/admin' element={ <AdminPanel /> } />
                

            </Routes>
        </Router>
    )
}