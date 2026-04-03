import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { useAuth } from '../../context/AuthContext';
import { useBasket } from '../../context/BasketContext';
import { ShoppingBasket, Trash2, Plus, Minus, ArrowRight, Utensils, ChevronLeft, History, Clock, ChevronRight, PackageCheck } from 'lucide-react';

const MyBasket = () => {
    const { user, token } = useAuth();
    const { basketItems, removeFromBasket, updateQuantity, clearBasket, totalItems, totalPrice } = useBasket();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeBooking, setActiveBooking] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [lastOrderDetails, setLastOrderDetails] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchActiveBooking = async () => {
            if (user) {
                try {
                    const res = await fetch('http://localhost:5000/api/bookings/my-bookings', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.success && data.bookings.length > 0) {
                        setActiveBooking(data.bookings[0]);
                    }
                } catch (err) {
                    console.error('Error fetching bookings:', err);
                }
            }
        };
        fetchActiveBooking();
    }, [user, token]);

    useEffect(() => {
        if (user && token) {
            fetchOrderHistory();
        }
    }, [user, token]);

    const fetchOrderHistory = async () => {
        setLoadingHistory(true);
        try {
            const res = await fetch('http://localhost:5000/api/room-service/my-history', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setOrderHistory(data.history);
            }
        } catch (err) {
            console.error('Error fetching history:', err);
        } finally {
            setLoadingHistory(false);
        }
    };



    const handlePlaceOrder = () => {
        setLastOrderDetails({
            items: [...basketItems],
            total: totalPrice,
            user: { name: user?.name, email: user?.email }
        });
        setShowSuccessModal(true);
        clearBasket();
    };

    const handleRoomServiceClick = () => {
        if (activeBooking) {
            navigate('/room-service-order', { state: { items: basketItems, activeBooking } });
        } else {
            alert("🛎️ Room service is only available for guests with an active booking. Please book a room first.");
        }
    };

    return (
        <div className="page-wrapper basket-page">
            <Navbar />

            <div className="container section basket-container">

                {/* Header */}
                <div className="basket-header">
                    <div className="user-avatar-lg">{user?.name?.charAt(0).toUpperCase()}</div>
                    <div>
                        <h1 className="basket-title">My Basket</h1>
                        <p className="basket-subtitle">{user?.email}</p>
                    </div>

                    {activeBooking && (
                        <div className="active-room-badge-basket ml-auto">
                            <span className="badge-icon">🛎️</span>
                            <div className="badge-text">
                                <span className="badge-label">Active Guest</span>
                                <span className="badge-value">Room {activeBooking.roomNumber}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Back */}
                <button className="back-btn" onClick={() => navigate('/restaurant')}>
                    <ChevronLeft size={16} /> Back to Restaurant
                </button>

                {/* Empty State */}
                {basketItems.length === 0 && (
                    <motion.div
                        className="empty-state glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ShoppingBasket size={58} className="empty-icon" />
                        <h2 className="empty-title">Your basket is empty</h2>
                        <p className="empty-desc">Browse our menu and add your favourite dishes!</p>
                        <Link to="/restaurant" className="btn btn-primary">
                            Explore Menu <ArrowRight size={16} className="inline ml-1" />
                        </Link>
                    </motion.div>
                )}

                {/* Basket Items + Summary */}
                {basketItems.length > 0 && (
                    <div className="basket-layout">

                        {/* Items List */}
                        <div className="basket-items-col">
                            <div className="basket-col-header">
                                <span>{totalItems} item{totalItems !== 1 ? 's' : ''} in your basket</span>
                                <button className="clear-all-btn" onClick={clearBasket}>
                                    <Trash2 size={14} /> Clear All
                                </button>
                            </div>

                            <AnimatePresence>
                                {basketItems.map((item, idx) => (
                                    <motion.div
                                        key={item.name}
                                        className="basket-item glass-card"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    >
                                        <img src={item.image} alt={item.name} className="basket-item-img" />

                                        <div className="basket-item-info">
                                            <h4 className="basket-item-name">{item.name}</h4>
                                            <p className="basket-item-desc">{item.desc}</p>

                                            {/* Ingredients mini tags */}
                                            {item.ingredients && (
                                                <div className="basket-mini-tags">
                                                    {item.ingredients.slice(0, 3).map((ing, i) => (
                                                        <span key={i} className="basket-mini-tag">{ing}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="basket-item-right">
                                            <span className="basket-item-price">{item.price}</span>

                                            {/* Qty Controls */}
                                            <div className="qty-controls">
                                                <button className="qty-btn" onClick={() => updateQuantity(item.name, -1)}>
                                                    <Minus size={13} />
                                                </button>
                                                <span className="qty-value">{item.quantity}</span>
                                                <button className="qty-btn" onClick={() => updateQuantity(item.name, 1)}>
                                                    <Plus size={13} />
                                                </button>
                                            </div>

                                            {/* Line total */}
                                            <span className="basket-line-total">
                                                ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                                            </span>

                                            <button className="remove-btn" onClick={() => removeFromBasket(item.name)}>
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <motion.div
                            className="basket-summary glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h3 className="summary-title">Order Summary</h3>
                            <div className="summary-gold-bar" />

                            <div className="summary-rows">
                                {basketItems.map(item => (
                                    <div key={item.name} className="summary-row">
                                        <span className="summary-row-name">
                                            {item.name.length > 28 ? item.name.slice(0, 28) + '…' : item.name}
                                            <span className="summary-row-qty"> ×{item.quantity}</span>
                                        </span>
                                        <span className="summary-row-price">
                                            ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-divider" />

                            <div className="summary-total-row">
                                <span>Total</span>
                                <span className="summary-total-amt">${totalPrice.toFixed(2)}</span>
                            </div>

                            <button className="btn-place-order" onClick={handlePlaceOrder}>
                                <Utensils size={17} />
                                Place Order
                            </button>

                            <button
                                className="btn-room-service-basket"
                                onClick={handleRoomServiceClick}
                            >
                                <span style={{ fontSize: '1.2rem' }}>🛎️</span>
                                Order via Room Service
                            </button>

                            <p className="summary-note">
                                🛎️ You can also request items via Room Service from the restaurant page.
                            </p>
                        </motion.div>
                    </div>
                )}

                {/* Ordered History Section */}
                <div className="ordered-history-section" style={{ marginTop: basketItems.length === 0 ? '4rem' : '6rem' }}>
                    <div className="section-header-history">
                        <History className="history-icon-main" />
                        <h2 className="history-main-title">Ordered History</h2>
                        <div className="history-line" />
                    </div>

                    {loadingHistory ? (
                        <div className="history-loading">Fetching your history...</div>
                    ) : orderHistory.length === 0 ? (
                        <div className="glass-card history-empty">
                            <PackageCheck size={32} className="text-dim mb-3" />
                            <p>No past room service orders found.</p>
                        </div>
                    ) : (
                        <div className="history-list">
                            {orderHistory.map((order, idx) => (
                                <motion.div
                                    key={order._id}
                                    className="history-card glass-card"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                >
                                    <div className="history-card-header">
                                        <div className="history-date-box">
                                            <Clock size={14} className="text-primary" />
                                            <span>
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short', day: 'numeric', year: 'numeric'
                                                })} • {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="history-card-body">
                                        <div className="history-items-preview">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="history-mini-item">
                                                    <img src={item.image} alt={item.name} className="mini-item-img" />
                                                    <span className="mini-item-name">{item.name} <small>x{item.quantity}</small></span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="history-card-right">
                                            <div className="history-total-label">Total Amount</div>
                                            <div className="history-total-val">${order.totalAmount.toFixed(2)}</div>
                                            <button
                                                className="history-view-btn"
                                                onClick={() => navigate('/room-service-order', { state: { fromHistory: true } })}
                                            >
                                                Details <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Order Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        className="modal-overlay-basket"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="modal-content-basket glass-card"
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="success-icon-wrapper">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                >
                                    <PackageCheck size={50} color="#d4af37" />
                                </motion.div>
                            </div>

                            <h2 className="modal-title-basket">Order Confirmed!</h2>
                            <p className="modal-subtitle-basket">Thank you for choosing LuxeStay. Your order has been successfully placed.</p>

                            <div className="user-details-summary">
                                <div className="detail-item">
                                    <span className="detail-label">Guest Name</span>
                                    <span className="detail-val">{lastOrderDetails?.user?.name}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Email Address</span>
                                    <span className="detail-val">{lastOrderDetails?.user?.email}</span>
                                </div>
                            </div>

                            <div className="order-items-summary">
                                <h4 className="summary-section-title">Order Details</h4>
                                <div className="summary-items-list">
                                    {lastOrderDetails?.items.map((item, i) => (
                                        <div key={i} className="summary-item-row">
                                            <span>{item.name} <small>x{item.quantity}</small></span>
                                            <span>{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="summary-total-footer">
                                    <span>Total Amount Paid</span>
                                    <span>${lastOrderDetails?.total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="modal-footer-basket">
                                <p className="confirmation-msg">🛎️ Our team will deliver your order shortly.</p>
                                <button
                                    className="btn btn-primary modal-close-btn-basket"
                                    onClick={() => {
                                        setShowSuccessModal(false);
                                        navigate('/restaurant');
                                    }}
                                >
                                    Continue Dining
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />

            <style>{`
                .basket-page { 
                    background: radial-gradient(circle at top right, #0f172a, #020617);
                    color: var(--text-main); 
                    min-height: 100vh;
                }

                .basket-container { 
                    padding-top: calc(var(--nav-height) + 3rem); 
                    padding-bottom: 6rem; 
                    max-width: 1200px;
                }

                .basket-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding-bottom: 2.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    margin-bottom: 2rem;
                }

                .user-avatar-lg {
                    width: 72px; height: 72px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #d4af37, #f1d37e);
                    color: #000;
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 800; font-size: 2rem;
                    flex-shrink: 0;
                    box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
                    border: 3px solid rgba(255, 255, 255, 0.1);
                }

                .basket-title { 
                    font-family: 'Algerian', serif;
                    font-size: 2.8rem; 
                    color: #fff; 
                    font-weight: 700; 
                    margin-bottom: 0.2rem;
                    letter-spacing: 0.02em;
                    text-shadow: 0 0 30px rgba(212, 175, 55, 0.2);
                }
                .basket-subtitle { color: var(--text-muted); font-size: 1rem; opacity: 0.8; }

                .back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #d4af37;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    margin-bottom: 2.5rem;
                    padding: 0.6rem 1.2rem;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                }
                .back-btn:hover { 
                    background: rgba(212, 175, 55, 0.1);
                    transform: translateX(-5px);
                    border-color: #d4af37;
                }

                /* ── Empty State ── */
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    min-height: 45vh;
                    padding: 4rem;
                    max-width: 550px;
                    margin: 0 auto;
                    border-radius: 24px;
                    background: rgba(30, 41, 59, 0.4);
                    backdrop-filter: blur(15px);
                }
                .empty-icon { color: rgba(212,175,55,0.3); margin-bottom: 2rem; filter: drop-shadow(0 0 15px rgba(212,175,55,0.2)); }
                .empty-title { font-size: 1.8rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem; font-family: 'Algerian', serif; }
                .empty-desc { color: var(--text-muted); margin-bottom: 2.5rem; font-size: 1.1rem; line-height: 1.6; }

                /* ── Layout ── */
                .basket-layout {
                    display: grid;
                    grid-template-columns: 1fr 380px;
                    gap: 3rem;
                    align-items: start;
                }

                /* ── Items ── */
                .basket-items-col { display: flex; flex-direction: column; gap: 1.25rem; }

                .basket-col-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: var(--text-muted);
                    font-size: 1rem;
                    margin-bottom: 0.75rem;
                    padding: 0 0.5rem;
                }

                .clear-all-btn {
                    display: flex; align-items: center; gap: 0.4rem;
                    background: none; border: none;
                    color: #ef4444; font-size: 0.9rem; font-weight: 600;
                    cursor: pointer; transition: all 0.2s;
                }
                .clear-all-btn:hover { opacity: 0.8; transform: scale(1.02); }

                .basket-item {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 1.5rem;
                    border-radius: 20px;
                    background: rgba(30, 41, 59, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .basket-item:hover {
                    background: rgba(30, 41, 59, 0.6);
                    border-color: rgba(212, 175, 55, 0.3);
                    transform: translateY(-4px) scale(1.01);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
                }

                .basket-item-img {
                    width: 110px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 14px;
                    flex-shrink: 0;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                }

                .basket-item-info { flex: 1; min-width: 0; }

                .basket-item-name {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 0.4rem;
                    font-family: 'Outfit', sans-serif;
                }

                .basket-item-desc {
                    font-size: 0.88rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                    margin-bottom: 0.75rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .basket-mini-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
                .basket-mini-tag {
                    background: rgba(212,175,55,0.06);
                    border: 1px solid rgba(212,175,55,0.15);
                    color: #d4af37;
                    font-size: 0.75rem;
                    font-weight: 600;
                    padding: 0.2rem 0.7rem;
                    border-radius: 50px;
                    letter-spacing: 0.02em;
                }

                .basket-item-right {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 0.75rem;
                    flex-shrink: 0;
                    padding-left: 1rem;
                    border-left: 1px solid rgba(255, 255, 255, 0.05);
                }

                .basket-item-price { font-size: 1.15rem; font-weight: 700; color: #d4af37; }

                .qty-controls {
                    display: flex; align-items: center; gap: 0.75rem;
                    background: rgba(2, 6, 23, 0.4);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 50px;
                    padding: 0.3rem 0.7rem;
                }
                .qty-btn {
                    background: rgba(212, 175, 55, 0.1); 
                    border: none; 
                    color: #d4af37;
                    width: 26px; height: 26px;
                    border-radius: 50%;
                    cursor: pointer; display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s;
                }
                .qty-btn:hover { background: #d4af37; color: #000; }
                .qty-value { font-weight: 700; font-size: 1rem; color: #fff; min-width: 22px; text-align: center; }

                .basket-line-total { font-size: 1.1rem; font-weight: 800; color: #fff; margin-top: 0.2rem; }

                .remove-btn {
                    background: rgba(239, 68, 68, 0.08); 
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                    width: 32px; height: 32px;
                    border-radius: 10px;
                    cursor: pointer; transition: all 0.2s;
                    display: flex; align-items: center; justify-content: center;
                }
                .remove-btn:hover { background: #ef4444; color: #fff; transform: rotate(15deg); }

                /* ── Summary Card (Luxury Receipt) ── */
                .basket-summary {
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 28px;
                    padding: 2.5rem;
                    position: sticky;
                    top: calc(var(--nav-height) + 2rem);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                }

                .summary-title {
                    font-family: 'Algerian', serif;
                    font-size: 1.6rem;
                    color: #fff;
                    margin-bottom: 1rem;
                    letter-spacing: 0.05em;
                    text-align: center;
                }

                .summary-gold-bar {
                    width: 60px; height: 4px;
                    background: linear-gradient(to right, transparent, #d4af37, transparent);
                    border-radius: 2px;
                    margin: 0 auto 2rem;
                }

                .summary-rows { display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem; }

                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 1rem;
                }
                .summary-row-name { font-size: 0.9rem; color: var(--text-muted); flex: 1; }
                .summary-row-qty { color: #d4af37; font-weight: 700; font-size: 0.85rem; }
                .summary-row-price { font-size: 0.95rem; font-weight: 700; color: #fff; flex-shrink: 0; }

                .summary-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent); margin: 1.5rem 0; }

                .summary-total-row {
                    display: flex; justify-content: space-between; align-items: flex-end;
                    margin-bottom: 2.5rem;
                }
                .summary-total-row span:first-child { font-size: 1.1rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
                .summary-total-amt { font-size: 2.2rem; font-weight: 800; color: #d4af37; line-height: 1; text-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }

                .btn-place-order {
                    width: 100%;
                    display: flex; align-items: center; justify-content: center; gap: 0.8rem;
                    background: linear-gradient(135deg, #d4af37, #eec35d);
                    color: #000;
                    border: none;
                    padding: 1.15rem;
                    border-radius: 50px;
                    font-weight: 800;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    margin-bottom: 1.25rem;
                    box-shadow: 0 8px 30px rgba(212, 175, 55, 0.3);
                }
                .btn-place-order:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 15px 45px rgba(212, 175, 55, 0.45);
                    background: #f1d37e;
                }
                .btn-place-order:active { transform: translateY(0); }

                .btn-room-service-basket {
                    width: 100%;
                    display: flex; align-items: center; justify-content: center; gap: 0.75rem;
                    background: rgba(255, 255, 255, 0.03);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1rem;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-bottom: 2rem;
                }
                .btn-room-service-basket:hover {
                    background: rgba(212, 175, 55, 0.08);
                    border-color: #d4af37;
                    color: #d4af37;
                }

                .summary-note {
                    font-size: 0.8rem;
                    color: var(--text-dim);
                    text-align: center;
                    line-height: 1.6;
                    padding: 0 1rem;
                }

                /* ── Ordered History Section ── */
                .ordered-history-section {
                    position: relative;
                }
                .section-header-history {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    margin-bottom: 3rem;
                }
                .history-icon-main { 
                    color: #d4af37; 
                    background: rgba(212,175,55,0.1);
                    padding: 10px; 
                    border-radius: 12px; 
                    width: 48px; height: 48px; 
                    border: 1px solid rgba(212,175,55,0.2);
                }
                .history-main-title { font-size: 2.2rem; font-weight: 700; color: #fff; font-family: 'Algerian', serif; letter-spacing: 0.02em; }
                .history-line { height: 2px; flex: 1; background: linear-gradient(to right, rgba(212,175,55,0.4), transparent); }
                
                .history-tabs {
                    display: flex;
                    gap: 1.25rem;
                    margin-bottom: 2.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .history-tab-btn {
                    background: transparent;
                    border: none;
                    color: var(--text-muted);
                    font-size: 1rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    cursor: pointer;
                    padding: 0.5rem 0;
                    position: relative;
                    transition: all 0.3s ease;
                    opacity: 0.6;
                }
                .history-tab-btn:hover { opacity: 1; color: #fff; }
                .history-tab-btn.active { opacity: 1; color: #d4af37; }
                .history-tab-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: -1rem;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: #d4af37;
                    box-shadow: 0 0 10px rgba(212,175,55,0.5);
                }

                .history-loading { padding: 5rem; text-align: center; color: var(--text-muted); font-size: 1.1rem; }
                .history-empty { padding: 4rem; text-align: center; color: var(--text-muted); border-radius: 20px; }

                .history-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); gap: 2rem; }
                
                .history-card { 
                    padding: 1.75rem; 
                    border-radius: 24px;
                    background: rgba(30, 41, 59, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: all 0.4s ease; 
                }
                .history-card:hover { transform: translateY(-8px); border-color: rgba(212,175,55,0.5); box-shadow: 0 15px 40px rgba(0,0,0,0.4); }

                .history-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
                .history-date-box { 
                    display: flex; align-items: center; gap: 0.6rem; 
                    font-size: 1.1rem; color: #fff; 
                    background: rgba(255,255,255,0.03);
                    padding: 0.5rem 1rem; border-radius: 10px;
                    font-family: 'Outfit', sans-serif;
                }
                .history-status-badge { 
                    background: rgba(212, 175, 55, 0.1); 
                    color: #d4af37; font-size: 0.75rem; font-weight: 800; 
                    text-transform: uppercase; padding: 0.35rem 0.9rem; 
                    border-radius: 50px; border: 1px solid rgba(212,175,55,0.3); 
                    letter-spacing: 0.05em;
                }

                .history-card-body { display: flex; justify-content: space-between; align-items: flex-end; gap: 1.5rem; }
                .history-items-preview { display: flex; flex-direction: column; gap: 0.75rem; flex: 1; }
                
                /* Table Reservation Specific */
                .res-details-preview { flex: 1; display: flex; flex-direction: column; gap: 0.8rem; }
                .res-guest-info { font-size: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.6rem; margin-bottom: 0.2rem; width: 100%; display: flex; align-items: center; }
                .res-guest-name { font-weight: 700; color: #d4af37; margin-left: 0.6rem; font-size: 1.1rem; }
                
                .res-detail-line { display: flex; align-items: center; gap: 0.8rem; font-size: 1rem; color: #fff; }
                .res-detail-line .text-gold { color: #d4af37; }
                .text-dim { color: rgba(255,255,255,0.5); }
                .font-bold { font-weight: 700; }
                .ml-2 { margin-left: 0.5rem; }
                .history-status-label { font-size: 0.75rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.2rem; }

                .history-mini-item { display: flex; align-items: center; gap: 1rem; }
                .mini-item-img { width: 48px; height: 42px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
                .mini-item-name { font-size: 0.95rem; color: #fff; font-weight: 500; }
                .mini-item-name small { 
                    display: inline-block;
                    background: rgba(212,175,55,0.15);
                    color: #d4af37;
                    padding: 0 0.4rem;
                    border-radius: 4px;
                    margin-left: 0.3rem;
                    font-weight: 700;
                }

                .history-card-right { text-align: right; }
                .history-total-label { font-size: 0.8rem; color: var(--text-dim); margin-bottom: 0.25rem; font-weight: 600; text-transform: uppercase; }
                .history-total-val { font-size: 1.6rem; font-weight: 800; color: #fff; margin-bottom: 1rem; }
                .history-view-btn { 
                    background: rgba(255,255,255,0.05); 
                    border: 1px solid rgba(255,255,255,0.1); 
                    color: var(--text-muted); font-size: 0.85rem; 
                    padding: 0.45rem 1rem; border-radius: 50px; 
                    cursor: pointer; display: flex; align-items: center; gap: 0.4rem; 
                    transition: all 0.3s; font-weight: 600;
                }
                .history-view-btn:hover { background: #d4af37; color: #000; border-color: #d4af37; }

                /* ── Active Room Badge ── */
                .active-room-badge-basket {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: rgba(212, 175, 55, 0.12);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    padding: 0.75rem 1.5rem;
                    border-radius: 16px;
                    animation: premiumPulse 4s ease-in-out infinite;
                }
                @keyframes premiumPulse {
                    0%, 100% { transform: translateY(0); box-shadow: 0 5px 15px rgba(212, 175, 55, 0.1); }
                    50% { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(212, 175, 55, 0.25); border-color: rgba(212, 175, 55, 0.7); }
                }
                .badge-icon { font-size: 1.8rem; filter: drop-shadow(0 0 5px rgba(212,175,55,0.5)); }
                .badge-text { display: flex; flex-direction: column; }
                .badge-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #d4af37; font-weight: 800; margin-bottom: 0.1rem; }
                .badge-value { font-size: 1.2rem; font-weight: 800; color: #fff; font-family: 'Outfit', sans-serif; }

                .ml-auto { margin-left: auto; }

                /* ── Modal Styles ── */
                .modal-overlay-basket {
                    position: fixed;
                    inset: 0;
                    background: rgba(2, 6, 23, 0.85);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    padding: 2rem;
                }
                .modal-content-basket {
                    max-width: 420px;
                    width: 100%;
                    padding: 1.75rem 1.75rem 1.5rem;
                    text-align: center;
                    border-radius: 22px;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    max-height: 90vh;
                    overflow-y: auto;
                }
                .success-icon-wrapper {
                    width: 60px; height: 60px;
                    background: rgba(212, 175, 55, 0.1);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 0.85rem;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                }
                .modal-title-basket { font-family: 'Algerian', serif; font-size: 1.6rem; color: #fff; margin-bottom: 0.4rem; }
                .modal-subtitle-basket { color: var(--text-muted); margin-bottom: 1rem; font-size: 0.85rem; line-height: 1.5; }

                .user-details-summary {
                    background: rgba(255,255,255,0.03);
                    border-radius: 12px;
                    padding: 0.85rem;
                    margin-bottom: 0.85rem;
                    text-align: left;
                }
                .detail-item { display: flex; justify-content: space-between; margin-bottom: 0.35rem; font-size: 0.82rem; }
                .detail-label { color: var(--text-dim); }
                .detail-val { color: #fff; font-weight: 600; }

                .order-items-summary {
                    text-align: left;
                    margin-bottom: 1.25rem;
                }
                .summary-section-title { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: #d4af37; margin-bottom: 0.6rem; font-weight: 800; }
                .summary-items-list { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.75rem; }
                .summary-item-row { display: flex; justify-content: space-between; font-size: 0.85rem; color: #fff; }
                .summary-item-row small { color: #d4af37; font-weight: 700; margin-left: 0.4rem; }

                .summary-total-footer {
                    display: flex; justify-content: space-between; align-items: center;
                    padding-top: 0.6rem; border-top: 1px dashed rgba(255,255,255,0.1);
                    font-weight: 700; font-size: 0.95rem; color: #fff;
                }
                .summary-total-footer span:last-child { color: #d4af37; font-size: 1.2rem; }

                .confirmation-msg { color: var(--text-muted); font-size: 0.78rem; margin-bottom: 1rem; font-style: italic; }
                .modal-close-btn-basket { width: 100%; border-radius: 50px; padding: 0.85rem; }

                @media (max-width: 1024px) {
                    .basket-layout { grid-template-columns: 1fr; gap: 4rem; }
                    .basket-summary { position: static; max-width: 500px; margin: 0 auto; width: 100%; }
                    .history-list { grid-template-columns: 1fr; }
                }
                
                @media (max-width: 640px) {
                    .basket-header { flex-direction: column; text-align: center; }
                    .active-room-badge-basket { margin-left: 0; width: 100%; justify-content: center; }
                    .basket-title { font-size: 2.2rem; }
                    .basket-item { flex-direction: column; align-items: flex-start; }
                    .basket-item-img { width: 100%; height: 200px; }
                    .basket-item-right { width: 100%; border-left: none; border-top: 1px solid rgba(255,255,255,0.05); padding: 1.5rem 0 0; align-items: center; flex-direction: row; justify-content: space-between; }
                }
            `}</style>
        </div>
    );
};

export default MyBasket;
