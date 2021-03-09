import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import {isAuthanticate} from '../auth/helper'
import {Link} from 'react-router-dom'
import { getACategory,updateCategory } from './helper/adminapicall'
 
const UpdateCategory=({match})=>{


    const {user,token}=isAuthanticate();

    const [values,setValues]=useState({
        name:"",
        error:"",
        val:"",
        sucess:false
    });
    // const[error,setError]=useState(false)
    // const[success,setSuccess]=useState(false)
    
    const {name,val,error,sucess}=values;

    const preload=(categoryId)=>{
        getACategory(categoryId).then(data=>{
            console.log(data)
            if(data.err)
            {
              setValues({...values,error:data.err})
               
            }
            else
            {
                 setValues({
                     ...values,
                     name:data.name
                    
                 })
            }
        })
    }

    useEffect(()=>{
        preload(match.params.categoryId)
    },[])

    const handleChange=name=>event=>{
       setValues({
           ...values,
           [name]:event.target.value
       })

     
        
     };
     
     const onSubmit=event=>{
        event.preventDefault();
        console.log(name,match.params.categoryId,user._id,token);
        setValues({...values,error:"",loading:true});
        updateCategory(match.params.categoryId,user._id,token,{name})
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
                val:data.name,
                sucess:true})
            }
        })
        .catch(error=>console.log(error))


    }

    const successMessege=()=>{
        if(sucess)
        {
            return (
                <div className="alert alert-success mt-3 py-3">
                    <h4 className="text-success">{val} updated succesfully</h4>
                    <script>
                    window.setTimeout(() => {
                    window.location.href="http://localhost:3000/admin/dashbord"
            },2000)
                    </script>
                </div>
            )
        }
    }

    const ErrorMessege=()=>{
        if(error)
        {
            return (
                <div className="alert alert-success mt-3 py-3">
                    <h4 className="text-success">{error}</h4>
                </div>
            )
        }
    }

    const myCategoryForm=()=>(
        <form>
            <div className="form-group">
            <p className="lead">Enter The Category</p>
            <input type="text" 
            className="col-8 rounded from-control my-4 py-2" 
            autoFocus
            required
            onChange={handleChange("name")}
            value={name}
            placeholder="Enter Category"></input>
            <br/>
            <button 
            className="btn  btn-outline-info"
            onClick={onSubmit}  >update Category</button>

   
            </div>
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
                {successMessege()}
                {ErrorMessege()}
                {myCategoryForm()}
            </div>
        </div>
        
        </Base>
    )
}


 export default UpdateCategory;