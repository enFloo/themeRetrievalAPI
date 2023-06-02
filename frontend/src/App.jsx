import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Form from './components/Form.jsx';
import Table from './components/Table.jsx';
import Navbar from './components/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';



function App() {
  const [listProducts, setListProducts] = useState([]);

  useEffect(() =>{
    axios.get('http://127.0.0.1:5000/allproducts')
    .then(response =>{
      setListProducts(response.data);
    })
    .catch(error =>{
      console.log(error)
    });
  }, []);

  return(
    <>
      <div className="App">
        <Navbar />
        <h1 align='center'>Products</h1>
        <div className='content'>
          <div className='formContained'>
            <Form />
          </div>
          <div className='tableContainer'>
            <Table listProducts={listProducts} />
          </div>
        </div>
      </div>
  
    </>
  ) 
}


export default App;