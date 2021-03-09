import React, {useState,useEffect}from 'react';

import '../styles.css'
import {API} from '../backend'
import Base from '../core/Base'
import Card from './card'
import { getAllProducts } from '../admin/helper/adminapicall';

export default function Home(){
    console.log("API IS",API);
    const [products,setProducts]=useState([]);
    const [error,setError]=useState(false);


    const prloadallproducts=()=>{
        getAllProducts().then(data=>{
            if(data.err)
            {
                setError(data.err)
            }
            else{
                setProducts(data)
            }
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
      prloadallproducts();
    },[])


    return(
        <Base title="Home Page" description="Welcome to the t-shirt store">
           <div className="row text-center">
               <h1 className="text-white">All of T-shirts</h1>
               <div className="row">
                   {
                       products.map((products,index)=>{
                          return(
                              <div className="col-4 mb-4">
                                    <Card product={products}/>
                              </div>
                          )
                       })
                   }
               </div>

           </div>
        </Base>
    )
}

