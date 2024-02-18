import React, { useState } from 'react';
import Style from './Cart.module.css';
import { useContextValue } from '../../Context/CustomContext';
import Productitem from '../Products/Productitem';

function Cart() {
  const {cart,toast} = useContextValue();
  const [purchasing] = useState(false);
  return (
    <>
    <div className={Style.container}>
      {cart?.products?.length< 1 && <h2>Cart is Empty.</h2>}
      {cart?.products?.map((product,index)=>{
        return <>
        <div key={product.id}>{product.quantity>0&&<Productitem key={product.id} product={product} in_cart={true} index={index}/>}</div></> 
      })}

    </div>
      <div className="navbar sticky-bottom bg-body-tertiary" style={{bottom: '8px' , borderTop: '1px solid black' , borderBottom: '1px solid black'}}>
        <div className="container-fluid">
          <p className={Style.price}>${cart.total}</p>
          <button className='btn btn-success btn-sm' disabled={(cart.length === 0 ? true : '') || (purchasing ? true : '')}
          onClick={()=>{toast.info("This feature is not added")}}
          >{purchasing ? "Purchasing..." : "Purchase"}</button>
        </div>
      </div>
    </>
  )
}

export default Cart