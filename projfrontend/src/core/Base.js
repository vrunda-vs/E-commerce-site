import React from 'react'

import Menu from './menu'


const Base =({
    title="My Title",
    description="My description",
    className="bg-dark text-white p-4",
    children
})=>(
    <div>
        <Menu/>
        <div className="container-fluid">
        <div className="smalltron bg-dark text-white text-center">
            <h4 className="display-4">{title}</h4>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
        

        </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success   text-white text-center">
            <h4>If you got any question fell free to reach out</h4>
            <button className="btn btn-warning btn-lg px-3">Contact Us</button>
            </div> 
        <div className="container">
            <span className="text-muted">
                An amazing <span className="text-white"> Mern</span> bootcamps
            </span>
            </div> 

        </footer>
     
 
        </div> 
)

export default Base; 