import React ,{Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'

import {signout,isAuthanticate} from '../auth/helper/'


const CurrentMenu=(history,path)=>{
        if (history.location.pathname===path){
            return {color:"#2ecc72"}
        }
        else{
            return {color:"#FFF"}
        }
}


const Menu=({history})=>(
    <div>
        <ul className="nav nav-tab bg-dark">
            <li className="nav-item">
                <Link style={CurrentMenu(history,"/")} className="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link style={CurrentMenu(history,"/cart")} className="nav-link" to="/cart">
                    Cart
                </Link>
            </li>
           {isAuthanticate() && isAuthanticate().user.role===0 && (
                <li className="nav-item">
                <Link style={CurrentMenu(history,"/user/dashbord")} className="nav-link" to="/user/dashbord">
                    DashBoard
                </Link>
            </li>
           )}

            {isAuthanticate() && isAuthanticate().user.role===1 && (
                <li className="nav-item">
                <Link  style={CurrentMenu(history,"/admin/dashbord")} className="nav-link" to="/admin/dashbord">
                    A.DashBoard
                </Link>
            </li>
            )}

            {!isAuthanticate() && (
                <Fragment> 
                 
                 
                <li className="nav-item">
                <Link style={CurrentMenu(history,"/signup")} className="nav-link" to="/signup">
                    Sign Up
                </Link>
             </li>
           
                 
             <li className="nav-item">
             <Link style={CurrentMenu(history,"/signin")} className="nav-link" to="/signin">
                 Sign In
             </Link>
         </li>
           
             </Fragment>
            )}

    {isAuthanticate() && (
        // <li className="nav-item">
        //   <span
        //     className="nav-link text-warning"
        //     onClick={() => {
        //       signout(() => {
        //         history.push("/");
        //       });
        //     }}
        //   >
        //     Signout
        //   </span>
        // </li>
        <li className="nav-item">
        <Link 
        onClick={()=>{ 
            signout(()=>{
                history.push("/");
            })
        }}
         className="nav-link text-white" >
            Sign Out
        </Link>
    </li>
      )}
        </ul>
    </div>
)

export default withRouter(Menu);