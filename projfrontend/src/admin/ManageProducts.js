import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import {isAuthanticate} from '../auth/helper'
import { getAllProducts, deleteProduct } from './helper/adminapicall'

const ManageProducts=()=>{

    const [products,setProducts]=useState([])

    const{user,token}=isAuthanticate();

    const preload=()=>{
        getAllProducts().then(data=>{
            if(data.err)
            {
                console.log(data.err)
            }
            else{
                setProducts(data)
            }
        })
    }

    useEffect(()=>{
        preload();
    },[])

    const deletethisProduct=productId=>{
        deleteProduct(productId,user._id,token).then(data=>{
            if(data.err)
            {
                console.log(data.err)
            }
            else
            {
                preload();
            }
        })
        
    }



    const manageProductForm=()=>{
        return(      
      
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total products: {products.length}</h2>

         {products.map((products,index)=>{
             return(
              <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
             <h3 className="text-white text-left">{products.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${products._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={()=>{
                    deletethisProduct(products._id)
                }} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>)
         })}
        </div>
      </div>
    
   ) }


    return(
     
      <Base
      title="Manage Product Here!!"
      description="Prooduct Management section"
      className="container bg-info p-4">
     <Link to="/admin/dashbord" className="btn btn-md btn-dark mb-3">Admin Dashboard</Link>
      <div className="row bg-dark text-white rounded">
          <div className="col-md-12 offset-md-1">
      {manageProductForm()}
      </div>
        </div>
        
        </Base>
       
    )
}

export default ManageProducts;