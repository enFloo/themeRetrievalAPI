import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form.js';
import Table from './components/Table.js';
import Navbar from './components/Navbar.js';

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

  const handleAddProduct = (newProduct) =>{
    setListProducts([...listProducts, newProduct])
  };

  return(
    <>
      <div className="App">
        <Navbar />
        <h1 align='center'>Products</h1>
        <div className='content'>
          <div className='formContained'>
            <Form onAddProduct={handleAddProduct}/>
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