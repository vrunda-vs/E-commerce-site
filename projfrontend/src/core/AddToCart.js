import React, { useState,useEffect } from 'react'
import "../styles.css"
import Base from './Base'
import Card from './card';
import { loadCart } from './helper/CardHelper';
import StripeCheckout from './stripe';

const AddToCart=()=>{
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);
  
    useEffect(() => {
      setProducts(loadCart());
    }, [reload]);
  
    const loadAllProducts = (products) => {
      return (
        <div>
          <h2>This section is to load products</h2>
          {products.map((product, index) => (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          ))}
        </div>
      );
    };
    const loadCheckout = () => {
      return (
        <div>
          <h2>This section for checkout</h2>
        </div>
      );
    };
  
    return (
      <Base title="Cart Page" description="Ready to checkout">
        <div className="row text-center">
          <div className="col-6">{loadAllProducts(products)}</div>
          <div className="col-6"><StripeCheckout products={products}
  setReload = {setReload}
  reload = {setReload}></StripeCheckout></div>
        </div>
      </Base>
    );
    
}


export default AddToCart;