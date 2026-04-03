import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Crown, Utensils, Coffee, Pizza, Sandwich, Calendar, Users, ChevronDown, Search, LogOut, Menu, X, ShoppingBasket, ShoppingBag, History } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBasket } from '../../context/BasketContext';


const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const bookingRef = useRef(null);
    const profileRef = useRef(null);
    const { user, logout } = useAuth();
    const { totalItems } = useBasket();
    const isRestaurantPage = location.pathname.startsWith('/restaurant') || location.pathname === '/my-basket' || location.pathname === '/room-service-order' || location.pathname === '/my-reservations';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bookingRef.current && !bookingRef.current.contains(event.target)) {
                setShowBooking(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile drawer on route change
    useEffect(() => {
        setMobileOpen(false);
        setShowBooking(false);
    }, [location.pathname]);

    // Prevent body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const handleHomeClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleLogout = () => {
        setMobileOpen(false);
        logout();
    };

    return (
        <>
            <nav className={`navbar-main ${scrolled ? 'scrolled' : ''}`}>
                <div className="container nav-content">

                    {/* Logo */}
                    <Link to="/" onClick={handleHomeClick} className="logo-container">
                        <div className="logo-icon">
                            <Crown color="#1a1a1a" size={22} strokeWidth={2} />
                        </div>
                        <div className="logo-text-wrapper" style={{ fontFamily: 'Algerian' }}>
                            <span className="logo-main">LUXE<span className="text-primary">STAY</span></span>
                            <span className="logo-subtitle">Hotel &amp; Resort</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="nav-menu desktop-menu">
                        {!isRestaurantPage ? (
                            <>
                                <Link to="/" onClick={handleHomeClick} className="nav-link">Home</Link>
                                <Link to="/rooms" className="nav-link">Rooms</Link>
                                <Link to="/about" className="nav-link">About</Link>
                                <Link to="/contact" className="nav-link">Contact</Link>
                            </>
                        ) : null}

                        {/* Book & Stay Dropdown */}
                        {!isRestaurantPage && (
                            <div className="booking-cta-wrapper" ref={bookingRef}>
                                <button
                                    className={`btn btn-primary nav-cta ${showBooking ? 'active' : ''}`}
                                    onClick={() => setShowBooking(!showBooking)}
                                >
                                    <span>Book &amp; Stay</span>
                                    <ChevronDown size={14} className={`chevron-icon ${showBooking ? 'rotate' : ''}`} />
                                </button>

                                {showBooking && (
                                    <div className="booking-dropdown-menu animate-slide-down">
                                        <div className="booking-fields">
                                            <div className="booking-field">
                                                <label><Calendar size={14} /> Check In</label>
                                                <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                                            </div>
                                            <div className="booking-field">
                                                <label><Calendar size={14} /> Check Out</label>
                                                <input type="date" defaultValue={new Date(Date.now() + 86400000).toISOString().split('T')[0]} />
                                            </div>
                                            <div className="booking-field">
                                                <label><Users size={14} /> Guests</label>
                                                <select>
                                                    <option>1 Adult</option>
                                                    <option>2 Adults</option>
                                                    <option>3 Adults</option>
                                                    <option>4+ Adults</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="booking-dropdown-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <Link
                                                to="/rooms"
                                                className="btn btn-primary booking-search-btn"
                                                onClick={() => setShowBooking(false)}
                                            >
                                                <Search size={16} />
                                                <span>Check Availability</span>
                                            </Link>

                                            {user ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    <Link
                                                        to="/my-bookings"
                                                        className="btn btn-outline"
                                                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', fontSize: '0.9rem' }}
                                                        onClick={() => setShowBooking(false)}
                                                    >
                                                        <Calendar size={16} />
                                                        <span>Manage My Bookings</span>
                                                    </Link>
                                                    <Link
                                                        to="/my-basket"
                                                        className="btn btn-outline"
                                                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', fontSize: '0.9rem' }}
                                                        onClick={() => setShowBooking(false)}
                                                    >
                                                        <ShoppingBasket size={16} />
                                                        <span>My Basket</span>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <Link
                                                    to="/login"
                                                    className="btn btn-outline"
                                                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', fontSize: '0.9rem', color: 'var(--primary)', borderColor: 'var(--primary)' }}
                                                    onClick={() => setShowBooking(false)}
                                                >
                                                    <span>Log In / Sign Up to Book</span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Dynamic Restaurant/Hotel Switch */}
                        <Link
                            to={isRestaurantPage ? "/" : "/restaurant"}
                            className="btn btn-restaurant"
                        >
                            <Utensils size={16} className="icon-relative" />
                            <span>{isRestaurantPage ? "Hotel" : "Restaurant"}</span>
                            <div className="decor-icons">
                                <Pizza size={24} className="decor-icon icon-pizza" />
                                <Coffee size={20} className="decor-icon icon-coffee" />
                                <Sandwich size={18} className="decor-icon icon-sandwich" />
                            </div>
                        </Link>

                        {/* Auth Section */}
                        <div className="auth-section">
                            {user ? (
                                <div className="profile-wrapper" ref={profileRef}>
                                    <button
                                        className="profile-btn"
                                        onClick={() => setShowProfile(!showProfile)}
                                    >
                                        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                                        <span className="profile-name">{user.name.split(' ')[0]}</span>
                                        <ChevronDown size={14} className={`chevron-icon ${showProfile ? 'rotate' : ''}`} />
                                    </button>

                                    {showProfile && (
                                        <div className="profile-dropdown-menu animate-slide-down">
                                            <div className="profile-header">
                                                <p className="profile-full-name">{user.name}</p>
                                                <p className="profile-email">{user.email}</p>
                                            </div>
                                            <div className="profile-links">
                                                <button className="profile-link-btn" onClick={() => { setShowProfile(false); navigate('/my-bookings'); }}>
                                                    <Calendar size={16} /> My Bookings
                                                </button>
                                                <button className="profile-link-btn" onClick={() => { setShowProfile(false); navigate('/my-basket'); }}>
                                                    <ShoppingBasket size={16} /> My Basket
                                                </button>
                                                <button className="profile-link-btn" onClick={() => { setShowProfile(false); navigate('/my-reservations'); }}>
                                                    <History size={16} /> My Reservations
                                                </button>
                                                <button className="profile-link-btn logout-btn" onClick={logout}>
                                                    <LogOut size={16} /> Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="auth-buttons">
                                    <Link to="/login" className="nav-link">Log In</Link>
                                    <Link to="/register" className="btn btn-outline btn-sm">Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile: Right side (Avatar / Hamburger) */}
                    <div className="mobile-right">
                        {user && (
                            <div className="avatar avatar-mobile"
                                onClick={() => setMobileOpen(prev => !prev)}>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <button
                            className="hamburger-btn"
                            onClick={() => setMobileOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Overlay */}
            {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}

            {/* Mobile Drawer */}
            <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
                <div className="mobile-drawer-inner">
                    {/* User Info */}
                    {user && (
                        <div className="mobile-user-info">
                            <div className="avatar avatar-lg">{user.name.charAt(0).toUpperCase()}</div>
                            <div>
                                <p className="mobile-user-name">{user.name}</p>
                                <p className="mobile-user-email">{user.email}</p>
                            </div>
                        </div>
                    )}

                    {/* Nav Links */}
                    <nav className="mobile-nav-links">
                        {!isRestaurantPage ? (
                            <>
                                <Link to="/" onClick={handleHomeClick} className="mobile-nav-link">Home</Link>
                                <Link to="/rooms" className="mobile-nav-link">Rooms</Link>
                                <Link to="/about" className="mobile-nav-link">About</Link>
                                <Link to="/contact" className="mobile-nav-link">Contact</Link>
                            </>
                        ) : null}

                        {/* Dynamic Switch already handled below in auth section or separate */}
                        <Link
                            to={isRestaurantPage ? "/" : "/restaurant"}
                            className="mobile-nav-link mobile-nav-btn"
                        >
                            <Utensils size={16} />
                            {isRestaurantPage ? " Hotel" : " Restaurant"}
                        </Link>

                        {user && (
                            <>
                                <Link to="/my-bookings" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                                    <Calendar size={18} /> My Bookings
                                </Link>
                                <Link to="/my-basket" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                                    <ShoppingBasket size={18} /> My Basket
                                    {totalItems > 0 && <span className="basket-count-pills">{totalItems}</span>}
                                </Link>
                                <Link
                                    to="/my-basket"
                                    className="mobile-nav-link"
                                    state={{ tab: 'tables' }}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <History size={18} /> My Reservations
                                </Link>
                                <Link to="/room-service-order" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                                    <ShoppingBag size={18} /> My Orders
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Book & Stay - Only for Hotel */}
                    {!isRestaurantPage && (
                        <div className="mobile-booking-section">
                            <p className="mobile-section-label">Quick Booking</p>
                            <div className="mobile-booking-fields">
                                <div className="booking-field">
                                    <label><Calendar size={13} /> Check In</label>
                                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div className="booking-field">
                                    <label><Calendar size={13} /> Check Out</label>
                                    <input type="date" defaultValue={new Date(Date.now() + 86400000).toISOString().split('T')[0]} />
                                </div>
                            </div>
                            <Link to="/rooms" className="btn btn-primary mobile-check-btn" onClick={() => setMobileOpen(false)}>
                                <Search size={16} /> Check Availability
                            </Link>
                        </div>
                    )}

                    {/* Auth Buttons */}
                    <div className="mobile-auth">
                        {user ? (
                            <button className="btn mobile-logout-btn" onClick={handleLogout}>
                                <LogOut size={18} /> Logout
                            </button>
                        ) : (
                            <div className="mobile-auth-btns">
                                <Link to="/login" className="btn btn-outline mobile-auth-link" onClick={() => setMobileOpen(false)}>Log In</Link>
                                <Link to="/register" className="btn btn-primary mobile-auth-link" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                /* ─── BASE ─── */
                .navbar-main {
                    height: var(--nav-height);
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 1000;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    background: transparent;
                    border-bottom: 1px solid transparent;
                }

                .navbar-main.scrolled {
                    backdrop-filter: none;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    height: calc(var(--nav-height) - 10px);
                }

                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                }

                /* ─── LOGO ─── */
                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    text-decoration: none;
                    flex-shrink: 0;
                }

                .logo-icon {
                    width: 38px;
                    height: 38px;
                    background-color: var(--primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    box-shadow: var(--shadow-sm);
                }

                .logo-text-wrapper {
                    display: flex;
                    flex-direction: column;
                    line-height: 1;
                }

                .logo-main {
                    font-size: 1.6rem;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    color: var(--text-main);
                }

                .text-primary { color: var(--primary); }

                .logo-subtitle {
                    font-size: 0.6rem;
                    text-transform: uppercase;
                    letter-spacing: 0.18em;
                    color: var(--text-dim);
                    font-weight: 700;
                }

                /* ─── DESKTOP NAV ─── */
                .desktop-menu {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .mobile-right { display: none; }

                .nav-link {
                    color: var(--text-main);
                    text-decoration: none;
                    font-size: 0.95rem;
                    font-weight: 500;
                    opacity: 0.8;
                    transition: opacity 0.2s, color 0.2s;
                }

                .nav-link:hover { opacity: 1; color: var(--primary); }

                /* ─── BOOKING DROPDOWN ─── */
                @keyframes pulse-btn {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(204, 164, 59, 0.4); }
                    50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(204, 164, 59, 0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(204, 164, 59, 0); }
                }

                .nav-cta {
                    padding: 0.7rem 1.4rem;
                    font-size: 0.95rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    animation: pulse-btn 2.5s infinite ease-in-out;
                }

                .nav-cta:hover, .nav-cta.active { animation: none; transform: translateY(-2px); }

                .booking-cta-wrapper { position: relative; }

                .chevron-icon { transition: transform 0.3s ease; }
                .chevron-icon.rotate { transform: rotate(180deg); }

                .booking-dropdown-menu {
                    position: absolute;
                    top: calc(100% + 1rem);
                    right: 0;
                    width: 300px;
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                    padding: 1.5rem;
                    border: 1px solid rgba(0,0,0,0.05);
                    z-index: 1001;
                }

                .booking-fields {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 1.2rem;
                }

                .booking-field { display: flex; flex-direction: column; gap: 0.4rem; }

                .booking-field label {
                    font-size: 0.72rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #64748b;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .booking-field input, .booking-field select {
                    padding: 0.55rem 0.75rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    font-size: 0.88rem;
                    color: #1e293b;
                    outline: none;
                    transition: border-color 0.2s;
                }

                .booking-field input:focus, .booking-field select:focus { border-color: var(--primary); }

                .booking-search-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                    padding: 0.75rem;
                }

                /* ─── RESTAURANT ─── */
                .btn-restaurant {
                    background: #fff;
                    color: #1a1a1a;
                    position: relative;
                    overflow: hidden;
                    padding: 0.7rem 1.4rem;
                    font-size: 0.95rem;
                    animation: pulse-btn 2.5s 1.25s infinite ease-in-out;
                    border: none;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .btn-restaurant:hover {
                    background: #f1f5f9;
                    animation: none;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(204, 164, 59, 0.3);
                }

                .icon-relative { position: relative; z-index: 2; color: var(--primary); }

                .decor-icons {
                    position: absolute; inset: 0;
                    pointer-events: none;
                    opacity: 0.15;
                    transition: opacity 0.3s, transform 0.3s;
                }

                .btn-restaurant:hover .decor-icons { opacity: 0.3; transform: scale(1.1); }

                .decor-icon { position: absolute; color: var(--primary); }
                .icon-pizza { right: -5px; top: -5px; transform: rotate(15deg); }
                .icon-coffee { left: -5px; bottom: -1px; transform: rotate(-15deg); }
                .icon-sandwich { right: 20px; bottom: -5px; }

                /* ─── AUTH SECTION ─── */
                .auth-section {
                    margin-left: 0.5rem;
                    padding-left: 1rem;
                    border-left: 1px solid rgba(255, 255, 255, 0.1);
                }

                .auth-buttons { display: flex; align-items: center; gap: 1rem; }

                .btn-sm {
                    padding: 0.45rem 1rem;
                    font-size: 0.875rem;
                    min-width: unset;
                    animation: none;
                }

                .profile-wrapper { position: relative; }

                .profile-btn {
                    background: transparent;
                    border: none;
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    color: var(--text-main);
                    cursor: pointer;
                    padding: 0.2rem;
                    transition: color 0.2s;
                }
                .profile-btn:hover { color: var(--primary); }

                .avatar {
                    width: 34px; height: 34px;
                    border-radius: 50%;
                    background: var(--primary);
                    color: #1a1a1a;
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    flex-shrink: 0;
                }
                .avatar-lg { width: 48px; height: 48px; font-size: 1.3rem; }

                .profile-name { font-weight: 500; font-size: 0.9rem; }

                .profile-dropdown-menu {
                    position: absolute;
                    top: calc(100% + 1rem);
                    right: 0;
                    width: 250px;
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                    border: 1px solid rgba(0,0,0,0.05);
                    z-index: 1001;
                    overflow: hidden;
                }

                .profile-header {
                    padding: 1.1rem 1.4rem;
                    background: #f8fafc;
                    border-bottom: 1px solid #f1f5f9;
                }

                .profile-full-name { font-weight: 700; color: #0f172a; margin-bottom: 0.2rem; font-size: 1rem; }
                .profile-email { color: #64748b; font-size: 0.82rem; }

                .profile-links { padding: 0.4rem 0; }

                .profile-link-btn {
                    width: 100%; padding: 0.8rem 1.4rem;
                    display: flex; align-items: center; gap: 0.7rem;
                    background: transparent; border: none;
                    color: #334155; font-size: 0.9rem; cursor: pointer;
                    text-align: left; transition: background 0.2s;
                }

                .profile-link-btn:hover { background: #f1f5f9; color: var(--primary); }

                .logout-btn { color: #ef4444; border-top: 1px solid #f1f5f9; }
                .logout-btn:hover { background: #fef2f2; color: #dc2626; }

                /* ─── ANIMATIONS ─── */
                .animate-slide-down { animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* ─── HAMBURGER ─── */
                .hamburger-btn {
                    background: transparent;
                    border: none;
                    color: var(--text-main);
                    cursor: pointer;
                    padding: 0.35rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 6px;
                    transition: background 0.2s;
                }
                .hamburger-btn:hover { background: rgba(255,255,255,0.08); }

                /* ─── MOBILE OVERLAY ─── */
                .mobile-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.55);
                    z-index: 1099;
                    backdrop-filter: blur(2px);
                }

                /* ─── MOBILE DRAWER ─── */
                .mobile-drawer {
                    position: fixed;
                    top: 0; right: 0;
                    height: 100dvh;
                    width: min(85vw, 340px);
                    background: #0f172a;
                    border-left: 1px solid rgba(255,255,255,0.07);
                    z-index: 1100;
                    transform: translateX(100%);
                    transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow-y: auto;
                }

                .mobile-drawer.open { transform: translateX(0); }

                .mobile-drawer-inner {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    padding: 5rem 1.5rem 2rem;
                }

                .mobile-user-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(255,255,255,0.04);
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.08);
                }

                .mobile-user-name { font-weight: 700; color: #fff; font-size: 1rem; }
                .mobile-user-email { color: var(--text-dim); font-size: 0.8rem; margin-top: 0.15rem; }

                .mobile-nav-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .mobile-nav-link {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.85rem 1rem;
                    color: var(--text-main);
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 500;
                    border-radius: 8px;
                    transition: background 0.2s, color 0.2s;
                    background: transparent;
                    border: none;
                    width: 100%;
                    text-align: left;
                    cursor: pointer;
                }

                .mobile-nav-link:hover {
                    background: rgba(255,255,255,0.06);
                    color: var(--primary);
                }

                .mobile-section-label {
                    font-size: 0.72rem;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: var(--text-dim);
                    margin-bottom: 0.75rem;
                    font-weight: 600;
                }

                .mobile-booking-section {
                    padding: 1rem;
                    background: rgba(255,255,255,0.03);
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.07);
                }

                .mobile-booking-fields {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                }

                .mobile-booking-fields .booking-field label { color: var(--text-muted); }

                .mobile-booking-fields .booking-field input {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                }

                .mobile-check-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 0.8rem;
                }

                .mobile-auth { margin-top: auto; }

                .mobile-auth-btns {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .mobile-auth-link {
                    width: 100%;
                    text-align: center;
                    justify-content: center;
                    padding: 0.85rem;
                    text-decoration: none;
                }

                .mobile-logout-btn {
                    width: 100%;
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.25);
                    color: #f87171;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    padding: 0.85rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .mobile-logout-btn:hover { background: rgba(239, 68, 68, 0.2); }

                .avatar-mobile { display: none; }

                /* ─── RESPONSIVE ─── */
                @media (max-width: 1024px) {
                    .desktop-menu { gap: 1rem; }
                    .nav-cta, .btn-restaurant { padding: 0.6rem 1rem; font-size: 0.85rem; }
                }

                @media (max-width: 900px) {
                    .desktop-menu { display: none; }
                    .mobile-right {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                    }
                    .avatar-mobile { display: flex; }
                    .logo-main { font-size: 1.35rem; }
                    .logo-icon { width: 32px; height: 32px; }
                    .logo-icon svg { width: 18px; height: 18px; }
                }

                @media (max-width: 480px) {
                    .logo-subtitle { display: none; }
                    .logo-main { font-size: 1.2rem; }
                }

                /* ─── BASKET STYLES ─── */
                .nav-basket-lnk {
                    text-decoration: none;
                    color: var(--text-main);
                    padding: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }
                .nav-basket-lnk:hover { transform: scale(1.1); color: var(--primary); }

                .nav-basket-lnk-mobile {
                    text-decoration: none;
                    color: var(--text-main);
                    padding: 0.35rem;
                    margin-right: 0.5rem;
                }

                .basket-icon-wrapper { position: relative; display: flex; align-items: center; }
                
                .basket-badge {
                    position: absolute;
                    top: -8px; right: -10px;
                    background: #d4af37;
                    color: #000;
                    font-size: 0.68rem;
                    font-weight: 800;
                    min-width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    border: 2px solid #0f172a;
                    line-height: 1;
                    padding: 0 2px;
                }

                .basket-icon-wrapper-mob {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    width: 100%;
                }

                .basket-count-pills {
                    margin-left: auto;
                    background: var(--primary);
                    color: #000;
                    padding: 0.15rem 0.6rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 700;
                }

                @keyframes pop {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-pop { animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            `}</style>
        </>
    );
};

export default Navbar;
