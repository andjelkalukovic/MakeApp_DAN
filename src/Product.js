import React from 'react'
import { useHistory } from 'react-router-dom';

export const Product = ({product}) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`oneproduct/${product.id}`);
    }

    return(
        <div className="product">
            {product.brand}<br></br>
            {product.category}<br></br>
            {product.product_type}<br></br>
            {product.name}<br></br>
            <img src={product.api_featured_image} alt="No img" style={{width: "100px"}}></img>
            <button onClick={e=> handleClick(e)}>About</button><hr></hr>
        </div>
    )
}