import React, { useState } from 'react';
import Style from './Productitem.module.css';
import { AiFillStar } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { useContextValue } from '../../Context/CustomContext';
function Productitem(props) {
  const {updateCart,toast} = useContextValue();
  const [adding] = useState(false);
  const [removing] = useState(false);
  const handleAddToCart = async()=>{
    updateCart(props.product.id,1,-1);
    toast.success("Added to cart successfully.");
  }
  const handleRemoveFromCart = async(id,quantity)=>{
       updateCart(id,quantity,props.index);
       toast.success("Removed from cart");
  }
  return (
    <div className={Style.item + " card"} style={props.in_cart && {height: '25rem'}}>
        <img src={props.product.images?props.product.images[0]:props.product.thumbnail} className={Style.img + " card-img-top"} alt={props.product.title}/>
        <div className="card-body position-relative">
            <h5 className="card-title">{props?.product?.title?.slice(0,32)}...</h5>
            {!props.in_cart && <p className="card-text">{props?.product?.description?.slice(0,60)}...</p>}
            <h5 className='position-absolute' style={{bottom: '3.5rem'}}>
              ${props?.product?.price} 
              {props?.in_cart ? 
                <span className='mx-4'>
                  <AiFillMinusCircle onClick={()=> updateCart(props?.product?.id,props?.product?.quantity-1,props.index)} className='mx-2' style={{cursor: 'pointer'}}/>
                   {props?.product?.quantity} 
                  <AiFillPlusCircle onClick={()=>updateCart(props?.product?.id,props?.product?.quantity+1,props.index)} className='mx-2' style={{cursor: 'pointer'}}/>
                </span> :
                <span className='mx-3' style={{fontSize: '1rem'}}>
                  {props?.product?.rating} <AiFillStar style={{color:'#ffff00'}}/>
                </span>
              }
            </h5>
               
            <button className={(props?.in_cart ? "btn-danger" : "btn-primary") + " btn position-absolute"} style={{bottom: '1rem'}} 
            onClick={()=>{
              props?.in_cart ? handleRemoveFromCart(props?.product?.id,0,props.index) : handleAddToCart()
            }}
            disabled={(adding || removing) ? true : ''}
            >
              {props?.in_cart ? (removing ? 'Removing...' : 'Remove From Cart') : (adding ? "Adding..." : 'Add to Cart')}
            </button>
        </div>
    </div>
  )
}

export default Productitem