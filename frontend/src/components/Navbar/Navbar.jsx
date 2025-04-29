import React, { useContext, useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import MobileNav from './MobileNav';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("Home");
    const { getTotalCartAmount, token, setToken, food_list, setFilteredFoods } = useContext(StoreContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const suggestionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    const handleSearch = () => {
        const filtered = food_list.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFoods(filtered);
        setSuggestions([]);
        navigate("/search");
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() === "") {
            setSuggestions([]);
        } else {
            const filteredSuggestions = food_list.filter(item =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions.slice(0, 5));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (activeSuggestion >= 0 && activeSuggestion < suggestions.length) {
                setSearchTerm(suggestions[activeSuggestion].name);
            }
            handleSearch();
        } else if (e.key === 'ArrowDown') {
            setActiveSuggestion((prev) => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            setActiveSuggestion((prev) => Math.max(prev - 1, 0));
        }
    };

    return (
        <nav className='navbar'>
            <MobileNav />
            <Link to='/'><img src={assets.logo} width={200} alt="Logo" /></Link>

            <ul className='navbar-menu'>
                <Link to='/' className={menu === "Home" ? "active" : ""} onClick={() => setMenu("Home")}>Home</Link>
                <a href='#explore-menu' className={menu === "Menu" ? "active" : ""} onClick={() => setMenu("Menu")}>Menu</a>
                <a href='#app-download' className={menu === "Mobile-app" ? "active" : ""} onClick={() => setMenu("Mobile-app")}>Mobile-app</a>
                <a href='#footer' className={menu === "Contact-us" ? "active" : ""} onClick={() => setMenu("Contact-us")}>Contact us</a>
            </ul>

            <div className='navbar-right'>
                <div className='search-box' ref={suggestionRef}>
                    <input 
                        type="text" 
                        placeholder="Search food..." 
                        value={searchTerm}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <img 
                        src={assets.search_icon} 
                        alt="Search Icon" 
                        onClick={handleSearch} 
                        style={{ cursor: "pointer" }}
                    />

                    {suggestions.length > 0 && (
                        <ul className="suggestion-list">
                            {suggestions.map((item, index) => (
                                <li 
                                    key={item._id} 
                                    className={index === activeSuggestion ? 'active-suggestion' : ''}
                                    onClick={() => {
                                        setSearchTerm(item.name);
                                        handleSearch();
                                    }}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className='navbar-search-icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt="Basket Icon" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {!token ? (
                    <button className='button' onClick={() => setShowLogin(true)}>SIGN IN</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} width={50} alt="Profile" />
                        <ul className="nav-profile-dropdown">
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} width={20} alt="Logout" /><p>Logout</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
