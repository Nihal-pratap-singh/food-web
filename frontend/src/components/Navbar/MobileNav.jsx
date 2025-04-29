import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import './MobileNav.css'; // ← make sure to import this

const MobileNav = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [menu, setMenu] = useState("Home");

    const handleClick = (menuName) => {
        setMenu(menuName);
        setShowMenu(false); // close menu on click
    };

    return (
        <div className="mobile-nav">
            <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? <RxCross2 size={25} /> : <IoMenu size={25} />}
            </button>

            <div className={`mobile-menu-wrapper ${showMenu ? 'open' : ''}`}>
                <ul className='mobile-menu-items'>
                    <li>
                        <Link to='/' className={menu === "Home" ? "active" : ""} onClick={() => handleClick("Home")}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <a href='#explore-menu' className={menu === "Menu" ? "active" : ""} onClick={() => handleClick("Menu")}>
                            Menu
                        </a>
                    </li>
                    <li>
                        <a href='#app-download' className={menu === "Mobile-app" ? "active" : ""} onClick={() => handleClick("Mobile-app")}>
                            Mobile-app
                        </a>
                    </li>
                    <li>
                        <a href='#footer' className={menu === "Contact-us" ? "active" : ""} onClick={() => handleClick("Contact-us")}>
                            Contact us
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MobileNav;
