import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material';

export default function Form({ listProducts, setListProducts}){

    const handleSubmit = (event) =>{
        event.preventDefault();

        const formData = new FormData(event.target);
        const product ={
            name: formData.get('name'),
            thumbnailURL: formData.get('thumbnailURL'),
            sourceURL: formData.get('sourceURL'),
            category: formData.get('category'),
        };

        axios.post('http://127.0.0.1:5000/add_product', product)
        .then((response) =>{
            setListProducts([...listProducts, response.data]);
        })
        .catch((error) =>{
            console.log(error);
        });
    }
    return(
        <div className='formContainer'>
            <Card variant="outlined" className='card'>
                <CardContent className=''>
                    <h2 align='center'>Add Products</h2>
                    <FormControl onSubmit={handleSubmit}>
                    <TextField type="text" size='small' color='primary' placeholder='Product Name' style={{ width: '125%' }} className='formTextField'></TextField>
                    <TextField type="text" size='small' color='primary' placeholder='ThumbnailURL' style={{ width: '125%' }}></TextField>
                    <TextField type="text" size='small' color='primary' placeholder='SourceURL' style={{ width: '125%' }}></TextField>
                    <TextField type="text" size='small' color='primary' placeholder='Category' style={{ width: '125%' }}></TextField>
                    <div className='submitButton'>
                        <Button align='center' type='submit'>Submit</Button>
                    </div>
                    
                    </FormControl>
                </CardContent>
            </Card>
        </div>
        
    )
}