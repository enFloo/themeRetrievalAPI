import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material';

export default function Form({ listProducts, setListProducts}){
  const [flashMessage, setFlashMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    thumbnailURL: '',
    sourceURL: '',
    category: '',
  });

  const handleInputChange = (event) =>{
    const { name, value} = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,

    }));
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    if (
      formData.name.trim() === '' ||
      formData.thumbnailURL.trim() === '' ||
      formData.sourceURL.trim() === '' ||
      formData.category.trim() === ''
    ) {
      setFlashMessage('Please fill in all fields.'); 
      return; 
    }

    const { name, thumbnailURL, sourceURL, category } = formData;
    const newProduct ={
      name,
      thumbnailURL,
      sourceURL,
      category,
    };
  
    axios.post('http://127.0.0.1:5000/add_product', newProduct,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) =>{
      console.log(response.data);
      setFlashMessage('Product Added Successfully');
      setFormData({
        name: '',
        thumbnailURL: '',
        sourceURL: '',
        category: '',
      });
      
      })
    .catch((error) =>{
      console.error(error);
    });
  };

  return(
    <div className="formContainer">
      <Card variant="outlined" className="card">
      {flashMessage && <h4 className="success-message">{flashMessage}</h4>}
        <CardContent className="">
          <h2 align="center">Add Products</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              size="small"
              color="primary"
              placeholder="Product Name"
              sx={{ width: '100%' }}
              className="formTextField"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              type="text"
              size="small"
              color="primary"
              placeholder="ThumbnailURL"
              sx={{ width: '100%' }}
              name="thumbnailURL"
              value={formData.thumbnailURL}
              onChange={handleInputChange}
            />
            <TextField
              type="text"
              size="small"
              color="primary"
              placeholder="SourceURL"
              sx={{ width: '100%' }}
              name="sourceURL"
              value={formData.sourceURL}
              onChange={handleInputChange}
            />
            <TextField
              type="text"
              size="small"
              color="primary"
              placeholder="Category"
              sx={{ width: '100%' }}
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            <div className="submitButton">
              <Button align="center" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

