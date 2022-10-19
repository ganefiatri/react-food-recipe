import React from 'react';
import Home from './Home';
import {Route, Routes, useLocation} from 'react-router-dom';
import CategoryPages from './CategoryPages';
import Searched from './Searched';
import Recipe from './Recipe';
import {AnimatePresence} from "framer-motion";

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home/>}/>
        <Route path='/category/:type' element={<CategoryPages/>}/>
        <Route path='/Searched/:search' element={<Searched/>}/>
        <Route path='/recipes/:name' element={<Recipe/>}/>
      </Routes>
    </AnimatePresence>
  )
}

export default Pages