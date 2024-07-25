import React from 'react';
import { Link , useLocation} from 'react-router-dom';
import "../styles/NavBar.css"


 export   const NavBar = ()=>{

    const location = useLocation();

    return (
        <div className='navbar'>
            <div>
                <h1>Tiny Sprouts</h1>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="">Cart</Link>
                    </li>
                    <li>
                        <Link to="">Your Orders</Link>
                    </li>
                    <li>
                        <Link to="">Account Details</Link>
                    </li>
                    <li>
                        <Link to="/">Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
};
