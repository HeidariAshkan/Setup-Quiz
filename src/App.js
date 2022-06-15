import React from 'react'
import Layout from './components/Layout/index';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Quiz from './pages/Quiz/Quiz';



function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout><Main/></Layout>}/>
      <Route path='questions/:category' element={<Quiz/>}/>
    </Routes>
    
    </>
  )
}

export default App