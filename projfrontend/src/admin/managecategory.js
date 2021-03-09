import React, { useState ,useEffect} from 'react'
import Base from '../core/Base'
import {isAuthanticate} from '../auth/helper'
import { getAllCategory, deleteCategory } from './helper/adminapicall';
import {Link} from 'react-router-dom'

const ManageCategories=()=>{

    const [category,setCategory]=useState([]);

    const{user,token}=isAuthanticate();

    const preload=()=>{
        getAllCategory().then(data=>{
          console.log(data.length)
            if (data.err)
            {
                console.log(data.err)
            }
            else{
                setCategory(data)
            }
        })
    }

     useEffect(()=>{
        preload();
     },[])

     const deletethiscategory=categoryId=>{
        deleteCategory(categoryId,user._id,token).then(data=>{
            if (data.err)
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
          <h2 className="text-center text-white my-3">Total Category : {category.length}</h2>

         {category.map((category,index)=>{
             return(
              <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
             <h3 className="text-white text-left">{category.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${category._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={()=>{
                   deletethiscategory(category._id)
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
      title="Manage Category Here!!"
      description="Category Management section"
      className="container bg-info p-4">
     <Link to="/admin/dashbord" className="btn btn-md btn-dark mb-3">Admin Dashboard</Link>
      <div className="row bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
                 {manageProductForm()}
                 </div>
        </div>
        
        </Base>
       
    )
}
export default ManageCategories;