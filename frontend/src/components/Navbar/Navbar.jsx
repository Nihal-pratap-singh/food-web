import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("Home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")

    }

    return (
        <nav className='navbar'>
            <Link to='/'><img src={assets.logo} width={200} alt="Logo" /></Link>
            <ul className='navbar-menu'>
                <Link to='/' className={menu === "Home" ? "active" : ""}
                    onClick={() => setMenu("Home")}
                >
                    Home
                </Link>
                <a href='#explore-menu'
                    className={menu === "Menu" ? "active" : ""}
                    onClick={() => setMenu("Menu")}
                >
                    Menu
                </a>
                <a href='#app-download'
                    className={menu === "Mobile-app" ? "active" : ""}
                    onClick={() => setMenu("Mobile-app")}
                >
                    Mobile-app
                </a>
                <a href='#footer'
                    className={menu === "Contact-us" ? "active" : ""}
                    onClick={() => setMenu("Contact-us")}
                >
                    Contact us
                </a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt="Search Icon" />
                <div className='navbar-search-icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt="Basket Icon" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>SIGN IN</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} width={50} />
                        <ul className="nav-profile-dropdown">
                            <li><img src={assets.bag_icon} width={20} /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} width={20} /><p>Logout</p></li>
                        </ul>
                    </div>
                )}

            </div>
        </nav>
    );
}

export default Navbar;

