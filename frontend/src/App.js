import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form.js';
import Table from './components/Table.js';

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
        <Form />
        <Table listProducts={listProducts} />
        
      </div>
  
    </>
  ) 
}

export default App;