import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getProductById } from './services/Services';

export const OneProduct = () => {

    const [objekat, setOjekat] = useState({})
    const [color, setColor] = useState([])
    const {id} = useParams();

    const history = useHistory();

    useEffect(() => {
        getProductById(id).then(res =>{
         setOjekat(res.data)
         setColor(res.data.product_colors)
         console.log(res.data)
        })
      },[id])

    const handleClick = () => {
        history.push('/')
    }

    return(
        <>
        <div className='one-product'>
            <img src={objekat.image_link} alt='one-product'></img>

            <div className='about-one-product'>
            <p>Name: {objekat.name}</p>
            <p>Brand: {objekat.brand}</p>
            <p>Category: {objekat.category}</p>
            <p>Type: {objekat.product_type}</p>
            <p>Description: {objekat.description}</p>

            <p>Shades: {color.map(el=> (<li key={el.hex_value}>{el.colour_name}
            <div style={{backgroundColor:`${el.hex_value}`, height: '50px', width: '50px'}}></div>
            </li>))}</p>

            <p>Price: {objekat.price !== '0.0' ? 
            <span>{objekat.price}{objekat.price_sign}</span> :
            <span>Out of Stock</span>}</p>

            <a href={objekat.product_link} target="_blank" 
            rel="noopener noreferrer">Go to original page</a>
            </div>
        </div>

            <button onClick={e=> handleClick(e)}>Back</button>
        </>
    )
}