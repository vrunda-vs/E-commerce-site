import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import {getAllCategory, createProduct} from './helper/adminapicall'
import { cleanup } from '@testing-library/react'
import {isAuthanticate} from '../auth/helper/index'
import { API } from '../backend'

const AddProduct=()=>{

    const {user,token}=isAuthanticate();

    const[values,setValues]=useState({
        name:"",
        description:"",
        price:"",
        photo:"",
        stock:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        craetedProduct:"",
        getaredirect:false,
        fromData:""
    })

    const{name,description,price,stock,photo,categories,category,loading,error,craetedProduct,getaredirect,fromData}=values;
    useEffect(()=>{
        preLoad();
      },[]);

    const preLoad=()=>{
        getAllCategory().then(data=>{
            console.log(data)
            if(data.err)
            {
                setValues({...values,error:data.err})
            }
            else{
                setValues({...values,categories:data,fromData:new FormData()})
                console.log(categories);
            }
        }); 
    }

    const successMessage=()=>{
        return(
            <div className="alert alert-success mt-3"
            style={{display:craetedProduct ?<h4>{craetedProduct}created successfully</h4>+
            <script>window.setTimeout(() => {
                    window.location.href="http://localhost:3000/admin/dashbord"
            },2000)</script>
            :"none"}}>
                
             
            </div>
        )
    }

    const errorMessage=()=>{
        return(
            <div className="alert alert-danger mt-3"
            style={{display:error ?"" :"none"}}>
                <h4>{error}</h4>
            </div>
        )
    }


     const onSubmit=event=>{
        event.preventDefault();
        setValues({...values,error:"",loading:true});
        createProduct(user._id,token,fromData)
        .then(data=>{
            if(data.err)
            {
                console.log(data.err);  
                setValues({...values,error:data.err});
            }
            else{
                setValues({
                    ...values,
                name:"",
                description:"",
                price:"",
                photo:"",
                stock:"",
                loading:false,
                craetedProduct:data.name})
            }
        })
        .catch(error=>console.log(error))


    }

    const handleChange=name=>event=>{

        const value=name==="photo"?event.target.files[0] :event.target.value;
        fromData.set(name,value);
        setValues({...values,[name]:value});
    }


    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
                {
                    categories && 
                    categories.map((cate,index)=>(
                    <option key={index} value={cate._id}>{cate.name}</option>
                    ))
                }  
            
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Create Product
          </button>
        </form>
      );


    return(
        <Base
        title="Add Product Here!!"
        description="Prooduct creatation section"
        className="container bg-info p-4">
       <Link to="/admin/dashbord" className="btn btn-md btn-dark mb-3">Admin Dashboard</Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
               {createProductForm()}
            </div>
        </div>
        
        </Base>
    )
}

export default AddProduct;