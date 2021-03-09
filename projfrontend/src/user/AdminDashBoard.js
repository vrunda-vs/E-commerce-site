import React from 'react'
import Base from '../core/Base'
import {isAuthanticate} from '../auth/helper/index'
import { Link } from 'react-router-dom'

const Admindashboard=()=>{

const{user:{name,email,role}}=isAuthanticate()

const adminleftside=()=>{
    return(
        <div className="card">
            <h4 className="card-header bg-dark text-white">Admin Navigtion</h4>
            <ul className="nav-group">
                <li className="nav-group-item">
                    <Link to="/admin/create/category" className="nav-link text-success">Create Category</Link>
                </li>
                <li className="nav-group-item">
                    <Link to="/admin/categories" className="nav-link text-success">Manage Category</Link>
                </li>
                <li className="nav-group-item">
                    <Link to="/admin/create/product" className="nav-link text-success">
                        Create Product
                    </Link>
                </li>
                <li className="nav-group-item">
                    <Link to="/admin/orders" className="nav-link text-success">
                        Manage Order
                    </Link>
                </li>
                <li className="nav-group-item">
                    <Link to="/admin/products" className="nav-link text-success">
                        Manage Product
                    </Link>
                </li>
            </ul>
        </div>
    )
}

const adminrightside=()=>{
    return(
        <div className="card mb-4">
            <h4 className="card-header">Admin Informations</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Name:</span>{name}
                </li>
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Email:</span>{email}
                </li>
                <li className="list-group-item">
                    <span className="badge badge-danger ">Admin Area</span>
                </li>
            </ul>
            
        </div>
    )
}


return(
 <Base title="welcome to Admin Pannel" description="Manage all of your Product here"
 className="container bg-success p-3">
     <div className="row">
        <div className="col-3">
        {adminleftside()}
        </div>
        <div className="col-9">
        {adminrightside()}   
        </div>
     </div>
     
    
     
 </Base>
)
}

export default Admindashboard;
