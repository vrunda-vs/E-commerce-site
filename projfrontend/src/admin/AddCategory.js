import React , {useState} from 'react'
import Base from '../core/Base'
import {isAuthanticate} from '../auth/helper'
import {Link} from 'react-router-dom'
import {createCategory} from './helper/adminapicall'

const AddCategory=()=>{

    const[name,setName]=useState("")
        const[error,setError]=useState(false)
        const[success,setSuccess]=useState(false)

    const{user,token}=isAuthanticate()

    

    const goBack=()=>{
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/dashbord">Admin Home</Link>
            </div>
        )
    }


    const handleChange=event=>{
       setError("");
       setName(event.target.value);
       setSuccess(false)
       
    };


    const successMessege=()=>{
        if(success){
            return <h4 className="text-success">Category created succesfully</h4>
        }
    }
    const errorMessege=()=>{
        if(error){
        return <h4 className="text-danger">Failed to create category</h4>
        }
    }

    const onSubmit=event=>{

       
        event.preventDefault();
        setError("");
        setSuccess(false);
        

        //backend req fire
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.err)
            {
                setError(true)
                
             
            }
            else
            {
                setError("");
                setSuccess(true);
                setName("");

               
            }
        })
        .catch(err=>{
            console.log(err);
        });
    };


    const myCategoryForm=()=>(
            <form>
                <div className="form-group">
                <p className="lead">Enter The Category</p>
                <input type="text" 
                className="col-8 rounded from-control my-4 py-2" 
                autoFocus
                required
                onChange={handleChange}
                value={name}
                placeholder="Enter Category"></input>
                <br/>
                <button 
                className="btn  btn-outline-info"
                onClick={onSubmit}  >Create Category</button>

       
                </div>
            </form>
        );
    





    return(
        <Base
        title="Add Category Here!!"
        description="Category creation section"
        className="container bg-info p-4">
       <Link to="/admin/dashbord" className="btn btn-md btn-dark mb-3">Admin Dashboard</Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                   {successMessege()}
                   {errorMessege()}
               {myCategoryForm()}
             
               </div>
           </div>
       </Base>
    )
}

export default AddCategory;