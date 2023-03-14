import React from 'react';
import './navbar.css'
import { NavLink } from 'react-router-dom'
import { FaFirstOrder } from 'react-icons/fa';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CategoryIcon from '@mui/icons-material/Category';
import RedditIcon from '@mui/icons-material/Reddit';

const Navbar = () => {
    return (

        <div className="navbar">
            <NavLink className="link" to="/dashboard" activeClassName="active" > <DashboardIcon /><span> Dashboard</span> </NavLink>
            <NavLink className="link" to="/manage/orders" activeClassName="active" > <FaFirstOrder /><span> Orders</span> </NavLink>
            <NavLink className="link" to="/manage/products" activeClassName="active" > <InventoryIcon /><span> Products</span> </NavLink>
            <NavLink className="link" to="/manage/customers" activeClassName="active" > <SupportAgentIcon /><span> Customers</span> </NavLink>
            <NavLink className="link" to="/manage/categories" activeClassName="active" > <CategoryIcon /><span> Categories</span> </NavLink>
            <NavLink className="link" to="/manage/brands" activeClassName="active" > <RedditIcon /><span> Brands</span> </NavLink>
        </div>

    )
}

export default Navbar;
