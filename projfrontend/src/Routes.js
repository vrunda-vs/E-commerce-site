import React from 'react'
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom'
import Home from './core/Home';
import Signup from './user/Signup'
import Signin from './user/Signin'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashBoard from './user/UserDashBoard'
import Admindashboard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/managecategory';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct';

import UpdateCategory from './admin/updatecategory';
import AddToCart from './core/AddToCart';


const Routes=()=>{
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route exact path="/signin" component={Signin}></Route>
                <Route exact path="/cart" component={AddToCart}></Route>
                 
                 <PrivateRoute exact path="/user/dashbord" component={UserDashBoard} />
                <AdminRoute exact path="/admin/dashbord" component={Admindashboard}></AdminRoute>
                <AdminRoute exact path="/admin/create/category" component={AddCategory}></AdminRoute>
                <AdminRoute exact path="/admin/categories" component={ManageCategories}></AdminRoute>
                <AdminRoute exact path="/admin/create/product" component={AddProduct}></AdminRoute>            
                <AdminRoute exact path="/admin/products" component={ManageProducts}></AdminRoute>            
                <AdminRoute exact path="/admin/product/update/:productId" component={UpdateProduct}></AdminRoute>            
                <AdminRoute exact path="/admin/category/update/:categoryId" component={UpdateCategory}></AdminRoute>            

                

            </Switch>
        </Router>
    )
}

export default Routes;