import React,{useState} from 'react'
import Base from '../core/Base'
import {Link,Redirect} from 'react-router-dom'
import {signin,authanticate,isAuthanticate} from '../auth/helper'




const Signin=()=>{
    const[Values,setValues]=useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false

    });

    const {email,password,error,loading,didRedirect}=Values;

    const{user}=isAuthanticate();

    const handleChange=name=>event=>{
        setValues({...Values,error:false,[name]:event.target.value});
    }

    const Onsubmit=event=>{
        event.preventDefault();
        setValues({...Values,error:false,loading:true});
        signin({email,password})
        .then(data=>{
            if(data.err)
            {
                setValues({...Values,error:data.err,loading:false})
            }
            else
            {
                authanticate(data,()=>{
                    setValues({
                       ...Values,
                       email:"",
                       password:"",
                       error:"",
                       didRedirect:true
                    });
                })
               
            }
        })
        .catch(console.log("Error in signin"));
        
    }

   const performRedirect=()=>{
       //to do :redirect here
       if(didRedirect)
       {
           if(user && user.role===1)
           {
               return <Redirect to="admin/dashbord" />
           }
           if(user && user.role===0)
           {
               return <Redirect to="user/dashbord"/>
           }
       }
       if(isAuthanticate()){
           return <Redirect to="/"></Redirect>
       }
   }


    const loadingMessege=()=>{
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading.....</h2>
                </div>
            )
        )
    }
  
    const ErrorMessege=()=>{
        return(
          <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
      <div className="alert alert-danger"
      style={{display:error ? "" : "none" }}>
         {error}
      </div>
      </div>
      </div>)
  }

    const SigninFrom =()=>{
        return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group  ">
                        <label className="text-light">Email</label>
                        <input value={email} className="form-control" onChange={handleChange("email")}  type="email"></input>
                    </div>
                    <div className="form-group  ">
                        <label className="text-light">password</label>
                        <input className="form-control" value={password} onChange={handleChange("password")} type="password"></input>
                    </div>
                    <div className="form-group">
                        <label></label>
                    <button className="btn btn-success btn-block" onClick={Onsubmit}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    
    )
    }
    return(
    <Base title="Sign In" description="Sign In here">
     {loadingMessege()}
     {ErrorMessege()}
     {SigninFrom()}
     {performRedirect()}
    <p className="text-light text-center">{JSON.stringify(Values)}</p>
    </Base>
)
}

export default Signin;